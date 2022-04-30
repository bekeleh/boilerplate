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
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="email"
                                name="email"
                                type="email"
                                rules="required|email"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage class="text-red-600" name="email" />
                        </div>
                    </div>

                    <div>
                        <button
                            :disabled="submission"
                            type="submit"
                            class="mb-3 mt-3 cursor-pointer w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-et-green bg-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        >
                            Send Password Reset Link
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
        };
    },

    methods: {
        onSubmit(values) {
            let data = {
                email: values.email,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminAuth/forgotPassword", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.redirect("admin.forgot.password.reset.link");
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
