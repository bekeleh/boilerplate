<template>
    <div class="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
                Forgot password
            </h2>
        </div>
        <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
                <VeeForm @submit="onSubmit">
                    <div v-if="show_alert">
                        <ErrorAlert :alert="alert_message" />
                    </div>
                    <div>
                        <label
                            for="phone"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <div class="mb-2">
                            <input
                                id="phone"
                                v-model="value"
                                name="phone"
                                type="text"
                                autocomplete="phone"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                                placeholder="0911..."
                                @input="acceptNumber"
                                @blur="checkMobileNumber"
                            />
                            <!-- <ErrorMessage class="text-red-600" name="phone" /> -->
                            <span
                                v-if="phone_rule_validate"
                                class="text-red-600"
                                >This field phone is required.</span
                            >
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            class="mb-3 mt-3 cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-et-green bg-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        >
                            Submit
                        </button>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        ErrorAlert,
    },
    data() {
        return {
            loading: false,
            submission: false,
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_message: null,
            value: "",
            mobile_number: false,
        };
    },
    computed: {
        phone_rule_validate() {
            return this.mobile_number;
        },
    },

    methods: {
        checkMobileNumber() {
            this.isNullOrEmpty(this.value)
                ? (this.mobile_number = true)
                : (this.mobile_number = false);
        },
        acceptNumber() {
            let x = this.value.replace(/\D/g, "").match(/(\d{0,5})(\d{0,5})/);
            this.value = !x[2] ? x[1] : x[1] + (x[2] ? x[2] : "");
        },
        onSubmit(values) {
            this.isNullOrEmpty(this.value)
                ? (this.mobile_number = true)
                : (this.mobile_number = false);
            if (this.mobile_number) {
                return;
            }
            let data = {
                phone: this.value,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("clientAuth/forgotPassword", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.redirect("client.forgot.password.reset.code");
                    } else if (!response.data.success) {
                        this.show_alert = true;
                        this.alert_message = response.data.message;
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_message = error.response.data.message;
                }
            );
        },

        redirect(route) {
            this.$router.push({ name: route });
        },
    },
};
</script>
