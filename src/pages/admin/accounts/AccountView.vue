<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm>
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        User Details
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-2">
                            <label
                                for="first_name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                First name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="first-name"
                                    v-model="user.first_name"
                                    type="text"
                                    name="first_name"
                                    autocomplete="given-name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label
                                for="middle_name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Middle name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="middle-name"
                                    v-model="user.middle_name"
                                    type="text"
                                    name="middle_name"
                                    autocomplete="family-name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label
                                for="last_name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Last name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="last-name"
                                    v-model="user.last_name"
                                    type="text"
                                    name="last_name"
                                    autocomplete="family-name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-2">
                            <label
                                for="employee_number"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Employee ID
                            </label>
                            <div class="mt-1">
                                <input
                                    id="employee_number"
                                    v-model="user.employee_number"
                                    name="employee_number"
                                    type="text"
                                    autocomplete="email"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
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
                                <input
                                    id="email"
                                    v-model="user.email"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
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
                                <input
                                    id="phone"
                                    v-model="user.phone"
                                    name="phone"
                                    type="number"
                                    autocomplete="email"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- category -->
                        <div class="sm:col-span-2">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <div class="mt-1">
                                <select
                                    id="category"
                                    v-model="user.category"
                                    disabled
                                    name="category"
                                    autocomplete="category-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option value="non-management">
                                        Non management
                                    </option>
                                    <option value="management">
                                        Management
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- immediate supervisor -->
                        <div class="sm:col-span-2">
                            <label
                                for="manager_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Immediate Supervisor
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedManagers"
                                    :allow-empty="false"
                                    :options="managers"
                                    :searchable="true"
                                    :read-only="true"
                                    :taggable="true"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="email"
                                    track-by="id"
                                >
                                </VueMultiselect>
                            </div>
                        </div>
                        <!-- work group -->
                        <div class="sm:col-span-2">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Working Domain
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedCategories"
                                    :options="categories"
                                    :multiple="true"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    :read-only="true"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="id"
                                >
                                </VueMultiselect>
                            </div>
                        </div>
                        <!-- roles -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Roles
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedRoles"
                                    :options="roles"
                                    :multiple="true"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    :read-only="true"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="id"
                                >
                                    <span slot="noResult">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                </VueMultiselect>
                            </div>
                        </div>
                        <!-- permission -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Permissions
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedPermissions"
                                    :options="permissions"
                                    :multiple="true"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="true"
                                    :read-only="true"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                >
                                    <span slot="noResult">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                    >
                                </VueMultiselect>
                            </div>
                        </div>
                        <!-- email verify -->
                        <div class="sm:col-span-3">
                            <label
                                for="enabled"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Email address verify
                            </label>
                            <Switch
                                v-model="user.email_verified_at"
                                :class="[
                                    user.email_verified_at
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        user.email_verified_at
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                        <!-- disable user -->
                        <div class="sm:col-span-3">
                            <label
                                for="country"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable
                            </label>
                            <Switch
                                v-model="user.is_active"
                                :disabled="true"
                                :class="[
                                    user.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        user.is_active
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
                        Back
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import VueMultiselect from "vue-multiselect";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
    components: {
        Switch,
        VueMultiselect,
    },
    data() {
        return {
            loading: false,
            id: null,

            managers: [],
            selectedManagers: [],

            categories: [],
            selectedCategories: [],

            roles: [],
            selectedRoles: [],

            permissions: [],
            selectedPermissions: [],
            permissionTimeout: null,

            user: {
                id: "",
                first_name: "",
                middle_name: "",
                last_name: "",
                email: "",
                employee_number: "",
                phone: "",
                category: "",

                categories: [],
                managers: [],
                roles: [],
                permissions: [],
                is_active: false,
                email_verified_at: false,
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchUser(this.id);
    },
    methods: {
        fetchUser(id) {
            this.$store.dispatch("adminUser/fetchUserById", id).then(
                (response) => {
                    this.user = response.data.data;
                    this.selectedManagers = this.user.managers;
                    this.selectedCategories = this.user.categories;
                    this.selectedRoles = this.user.roles;
                    this.selectedPermissions = this.user.permissions;
                    this.user.email_verified_at = this.user.email_verified_at
                        ? true
                        : false;
                    this.user.is_active = this.user.is_active ? true : false;
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message = error.response.data.message;
                }
            );
        },

        handleCancel() {
            this.$router.push({
                name: "admin.accounts",
            });
        },
    },
};
</script>
