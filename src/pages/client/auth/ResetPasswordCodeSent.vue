<template>
    <div class="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
                Password reset verification code
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
                            for="code"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Verification Code
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="code"
                                v-model="code"
                                name="code"
                                type="text"
                                rules="required"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage class="text-red-600" name="code" />
                        </div>
                    </div>

                    <div class="flex flex-1">
                        <a
                            class="m-3 cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-900 bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bg-gray-900"
                            @click="backToForgotPassword"
                        >
                            Back
                        </a>
                        <button
                            type="submit"
                            class="m-3 cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-et-green bg-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
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
            code: "",
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_message: null,
        };
    },

    methods: {
        backToForgotPassword() {
            this.$router.push({ name: "client.forgot.password" });
        },
        onSubmit(values) {
            let data = {
                code: values.code,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("clientAuth/forgotPasswordCode", data).then(
                (response) => {
                    this.loading = false;
                    this.show_alert = true;

                    if (response.data && response.data.success) {
                        this.redirect("client.password.reset");
                    }
                    if (!response.data.success) {
                        this.alert_message = response.data.message;
                    } else {
                        this.alert_message =
                            "Whoops, looks like something went wrong";
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
            this.$router.push({ name: route, params: { token: this.code } });
        },
    },
};
</script>
