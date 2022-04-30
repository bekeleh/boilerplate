<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Edit Customer
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-6">
                            <div v-for="(errs, index) in errors" :key="index">
                                <div v-for="(err, indx) in errs" :key="indx">
                                    <ErrorAlert
                                        :alert="err"
                                        @dismiss-notification="
                                            cancelNotification
                                        "
                                    />
                                </div>
                            </div>
                            <div v-if="alert_success_message">
                                <SuccessAlert
                                    :alert="alert_success_message"
                                    @dismiss-notification="
                                        handleDismissNotification
                                    "
                                />
                            </div>
                            <div v-if="alert_error_message">
                                <ErrorAlert
                                    :alert="alert_error_message"
                                    @dismiss-notification="
                                        handleDismissNotification
                                    "
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Company name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="company_name"
                                    v-model="customer.company_name"
                                    type="text"
                                    name="company_name"
                                    autocomplete="company-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="company_name"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Full name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="name"
                                    v-model="customer.name"
                                    type="text"
                                    name="name"
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label
                                for="email"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="email"
                                    v-model="customer.email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="email"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label
                                for="phone"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Phone
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="phone"
                                    v-model="customer.phone"
                                    name="phone"
                                    type="number"
                                    autocomplete="email"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="email"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Customer verified
                            </label>
                            <Switch
                                v-model="customer.is_verified_client"
                                :class="[
                                    customer.is_verified_client
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        customer.is_verified_client
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>

                        <!-- email verification -->
                        <div class="sm:col-span-2">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address verified
                            </label>
                            <Switch
                                v-model="customer.email_verified_at"
                                :class="[
                                    customer.email_verified_at
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        customer.email_verified_at
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                        <div class="sm:col-span-2">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable customer
                            </label>
                            <Switch
                                v-model="customer.is_active"
                                :class="[
                                    customer.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        customer.is_active
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                        <div class="sm:col-span-2">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Banned customer
                            </label>
                            <Switch
                                v-model="customer.is_banned"
                                :class="[
                                    customer.is_banned
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        customer.is_banned
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-5 mb-8">
                <div class="flex justify-start">
                    <button
                        type="button"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        @click="handleCancel"
                    >
                        Cancel
                    </button>
                    <button
                        :disabled="submission"
                        type="submit"
                        class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        Switch,
        SuccessAlert,
        ErrorAlert,
    },

    data() {
        const enabled = ref(false);
        return {
            enabled,
            loading: false,
            submission: false,
            errors: [],
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            schema: {
                company_name: "required",
                name: "required",
                email: "required",
                phone: "required",
            },

            customer: {
                id: "",
                company_name: "",
                name: "",
                email: "",
                phone: "",
                email_verified_at: false,
                is_verified_client: false,
                is_banned: false,
                is_active: false,
            },
        };
    },
    created() {
        if (this.$route.params.id) {
            this.fetchCustomer();
        }
    },
    methods: {
        fetchCustomer() {
            this.$store
                .dispatch(
                    "adminCustomer/fetchCustomerById",
                    this.$route.params.id
                )
                .then(
                    (response) => {
                        this.customer = response.data.data;
                        this.customer.email_verified_at = this.customer
                            .email_verified_at
                            ? true
                            : false;
                        this.customer.is_verified_client = this.customer
                            .is_verified_client
                            ? true
                            : false;
                        this.customer.is_active = this.customer.is_active
                            ? true
                            : false;
                        this.customer.is_banned = this.customer.is_banned
                            ? true
                            : false;
                    },
                    (error) => {}
                );
        },

        onEditSubmit(values, actions) {
            const data = {
                company_name: this.customer.company_name,
                name: this.customer.name,
                email: this.customer.email,
                phone: this.customer.phone,
                email_verified_at: this.customer.email_verified_at,
                is_verified_client: this.customer.is_verified_client,
                is_active: this.customer.is_active,
                is_banned: this.customer.is_banned,
            };

            this.submission = true;
            this.loading = true;
            this.$store
                .dispatch("adminCustomer/updateCustomer", {
                    id: this.customer.id,
                    data: data,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data && response.data.success) {
                            this.show_alert = true;
                            this.alert_success_message = response.data.message;
                            actions.resetForm(); // 👈 Reset Form
                            this.reset();
                        } else {
                            this.alert_error_message =
                                "Whoops, looks like something went wrong";
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.show_alert = true;
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        } else if (error.response.status === 429) {
                            this.alert_error_message =
                                "Too many attempts, Please try again later";
                        } else if (error.response.status === 404) {
                            this.alert_error_message =
                                error.response.statusText;
                        }
                    }
                );
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        reset() {
            this.loading = false;
            this.submission = true;
            this.show_alert = false;
            this.customer.email_verified_at = false;
            this.customer.is_verified_client = false;
            this.customer.is_banned = false;
            this.customer.is_active = false;
        },

        handleCancel() {
            this.$router.push({ name: "admin.customers" });
        },
    },
};
</script>
