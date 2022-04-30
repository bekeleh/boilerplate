<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        New Customer
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
                        <div class="sm:col-span-2">
                            <label
                                for="company_name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Company name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="first-name"
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
                        <div class="sm:col-span-2">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Full name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="first-name"
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
                        <div class="sm:col-span-2">
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
                        <!-- password -->
                        <div class="sm:col-span-2">
                            <label
                                for="password"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="password"
                                    v-model="client.password"
                                    name="password"
                                    type="password"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="password"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
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
                        <!-- disable client -->
                        <div class="sm:col-span-3">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable
                            </label>
                            <Switch
                                v-model="enabled"
                                :class="[
                                    enabled
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        enabled
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
import "vue-multiselect/dist/vue-multiselect.css";
import axios from "axios";
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
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            errors: [],
            managers: [],
            selectedManagers: [],
            managerTimeout: null,

            categories: [],
            selectedCategories: [],
            categoryTimeout: null,

            roles: [],
            selectedRoles: [],
            roleTimeout: null,

            permissions: [],
            selectedPermissions: [],
            permissionTimeout: null,

            schema: {
                company_name: "required",
                name: "required",
                middle_name: "required",
                last_name: "required",
                employee_number: "required",
                email: "required",
                phone: "required",
                password: "required",
                category: "required",
            },

            client: {
                company_name: null,
                name: null,
                middle_name: null,
                last_name: null,
                email: null,
                employee_number: null,
                phone: null,
                password: null,
                category: null,
                manager_id: null,
                categories: [],
                roles: [],
                permissions: [],
                is_active: 0,
            },
        };
    },
    created() {},
    methods: {
        onEditSubmit(values, actions) {
            const data = {
                company_name: values.company_name,
                name: values.name,
                middle_name: values.middle_name,
                last_name: values.last_name,
                employee_number: values.employee_number,
                email: values.email,
                phone: values.phone,
                password: values.password,
                category: values.category,
                is_active: this.enabled,
                manager_id: this.selectedManagers
                    ? this.selectedManagers.id
                    : null,
                categories: this.selectedCategories
                    ? this.selectedCategories.map((p) => p.id)
                    : [],
                permissions: this.selectedPermissions,
                roles: this.selectedRoles
                    ? this.selectedRoles.map((g) => g.id)
                    : [],
            };

            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminCustomer/create", data).then(
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
                        this.alert_error_message = error.response.statusText;
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
            this.client.categories = [];
            this.client.managers = [];
            this.selectedManagers = null;
            this.selectedCategories = [];
            this.selectedRoles = [];
            this.selectedPermissions = [];
            this.enabled = false;
        },
        handleCancel() {
            this.$router.push({ name: "admin.clients" });
        },
        // manager
        loadManagers(search) {
            const params = {
                search: search,
            };
            if (this.managerTimeout) {
                clearInterval(this.managerTimeout);
            }
            this.loading = true;
            this.managerTimeout = setTimeout(() => {
                axios.get(`/api/v1/client_options`, { params }).then((res) => {
                    this.managers = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
        clearManagers() {
            this.selectedManagers = [];
        },
        createManager(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/client_options`, params).then((res) => {
                this.selectedManagers.push(res.data.data);
            });
        },
        // categories
        loadCategories(search) {
            const params = {
                search: search,
            };
            if (this.categoryTimeout) {
                clearInterval(this.categoryTimeout);
            }
            this.loading = true;
            this.categoryTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/category_options`, { params })
                    .then((res) => {
                        this.categories = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },
        clearCategories() {
            this.selectedCategories = [];
        },
        createCategory(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/category_options`, params).then((res) => {
                this.selectedCategories.push(res.data.data);
            });
        },

        // roles
        loadRoles(search) {
            const params = {
                search: search,
            };
            if (this.roleTimeout) {
                clearInterval(this.roleTimeout);
            }
            this.loading = true;
            this.roleTimeout = setTimeout(() => {
                axios.get(`/api/v1/role_options`, { params }).then((res) => {
                    this.roles = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
        clearRoles() {
            this.selectedRoles = [];
        },
        createRole(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/role_options`, params).then((res) => {
                this.selectedRoles.push(res.data.data);
            });
        },
        // permissions
        loadPermissions(search) {
            const params = {
                search: search,
            };
            if (this.permissionTimeout) {
                clearInterval(this.permissionTimeout);
            }
            this.loading = true;
            this.permissionTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/permission_options`, { params })
                    .then((res) => {
                        this.permissions = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },
        clearPermissions() {
            this.selectedPermssions = [];
        },
        createPermission(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/permission_options`, params).then((res) => {
                this.selectedPermssions.push(res.data.data);
            });
        },
        // end of permission search
    },
};
</script>
