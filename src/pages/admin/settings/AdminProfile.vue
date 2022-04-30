<template>
    <div class="mt-10 p-6 sm:mt-0">
        <div class="sm:col-span-6">
            <div v-if="alert_success_message">
                <SuccessAlert
                    :alert="alert_success_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
            <div v-if="alert_error_message">
                <ErrorAlert
                    :alert="alert_error_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
        </div>
        <div class="md:grid md:grid-cols-3 md:gap-6 sm:col-span-1">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        Use a permanent address where you can receive mail.
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2 sm:col-span-1">
                <VeeForm :validation-schema="schema" @submit="updateProfile">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="md:grid md:grid-cols-6 md:gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="first-name"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        First name
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            id="first-name"
                                            v-model="profile.first_name"
                                            type="text"
                                            name="first-name"
                                            autocomplete="given-name"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="middle-name"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Middle name
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            id="middle-name"
                                            v-model="profile.middle_name"
                                            type="text"
                                            name="middle-name"
                                            autocomplete="family-name"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="last-name"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Last name
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            id="last-name"
                                            v-model="profile.last_name"
                                            type="text"
                                            name="last-name"
                                            autocomplete="family-name"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="email"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Email address
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            id="email"
                                            v-model="profile.email"
                                            name="email"
                                            type="email"
                                            autocomplete="email"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="category"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Category
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            id="category"
                                            v-model="profile.category"
                                            name="category"
                                            type="text"
                                            autocomplete="category"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                :submission="submission"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>
<script>
import SuccessAlert from "../../alerts/SuccessAlert";
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        return {
            loading: false,
            submission: false,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,
            schema: {
                address: "required",
                city: "required",
            },
            profile: {
                first_name: "",
                middle_name: "",
                last_name: "",
                phone: "",
                email: "",
                category: "",
            },
        };
    },
    created() {
        this.fetchProfile();
    },
    methods: {
        fetchProfile() {
            this.loading = true;
            this.$store.dispatch("adminAuth/fetchProfile").then(
                (response) => {
                    this.loading = false;
                    if (response.data) {
                        this.profile = response.data.data;
                    } else {
                        this.show_alert = true;
                        this.alert_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_message =
                        "Whoops, looks like something went wrong";
                }
            );
        },
        updateProfile(values) {
            let data = {
                address: values.address,
                city: values.city,
                region: values.region,
                zip: values.code,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminAuth/updateProfile", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.alert_success_message = response.data.message;
                    } else {
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (error) => {
                    this.loading = false;
                    if (!error.response.data.success) {
                        this.alert_success_message = error.response.data.errors;
                    } else {
                        this.alert_success_message =
                            "Whoops, looks like something went wrong";
                    }
                }
            );
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
    },
};
</script>
