<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Edit Client
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
                                    v-model="client.company_name"
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
                                    v-model="client.name"
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
                                    v-model="client.email"
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
                                    v-model="client.phone"
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
                        <div class="sm:col-span-3"></div>

                        <!-- client email activation -->
                        <div class="sm:col-span-2">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address verify
                            </label>
                            <Switch
                                v-model="client.email_verified_at"
                                :class="[
                                    client.email_verified_at
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        client.email_verified_at
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
                                Disable client
                            </label>
                            <Switch
                                v-model="client.is_active"
                                :class="[
                                    client.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        client.is_active
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
                                Banned client
                            </label>
                            <Switch
                                v-model="client.is_banned"
                                :class="[
                                    client.is_banned
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        client.is_banned
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

            client: {
                id: "",
                company_name: "",
                name: "",
                email: "",
                phone: "",
                email_verified_at: false,
                is_banned: false,
                is_active: false,
            },
        };
    },
    created() {
        if (this.$route.params.id) {
            this.fetchClient();
        }
    },
    methods: {
        fetchClient() {
            this.$store
                .dispatch("adminClient/fetchClientById", this.$route.params.id)
                .then(
                    (response) => {
                        this.client = response.data.data;
                        this.client.email_verified_at = this.client
                            .email_verified_at
                            ? true
                            : false;
                        this.client.is_active = this.client.is_active
                            ? true
                            : false;
                        this.client.is_banned = this.client.is_banned
                            ? true
                            : false;
                    },
                    (error) => {}
                );
        },

        onEditSubmit(values, actions) {
            const data = {
                company_name: this.client.company_name,
                name: this.client.name,
                email: this.client.email,
                phone: this.client.phone,
                email_verified_at: this.client.email_verified_at,
                is_active: this.client.is_active,
                is_banned: this.client.is_banned,
            };

            this.submission = true;
            this.loading = true;
            this.$store
                .dispatch("adminClient/updateClient", {
                    id: this.client.id,
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
            this.client.email_verified_at = false;
            this.client.is_banned = false;
            this.client.is_active = false;
        },

        handleCancel() {
            this.$router.push({ name: "admin.clients" });
        },
    },
};
</script>
