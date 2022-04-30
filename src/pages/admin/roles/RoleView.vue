<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Role Details
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-4">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="name"
                                    v-model="role.name"
                                    type="text"
                                    name="name"
                                    readonly
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
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
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createPermission"
                                    @search-change="loadPermissions"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                    >
                                </VueMultiselect>
                            </div>
                        </div>

                        <!-- disable -->
                        <div class="sm:col-span-4">
                            <label
                                for="is_active"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable
                            </label>
                            <Switch
                                v-model="role.is_active"
                                :disabled="true"
                                :class="[
                                    role.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        role.is_active
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
                <div class="flex justify-items-end">
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
import axios from "axios";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
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
            id: "",
            permissions: [],
            selectedPermissions: [],
            permissionTimeout: "",

            schema: {
                name: "required",
            },

            role: {
                id: "",
                name: "",
                is_active: false,
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchRole(this.id);
    },
    methods: {
        fetchRole(id) {
            this.$store.dispatch("adminRole/fetchRoleById", id).then(
                (response) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.role = response.data.data;
                    this.selectedPermissions = response.data.data.permissions;
                    this.role.is_active = this.role.is_active ? true : false;
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message = error.response.data.message;
                }
            );
        },

        handleCancel() {
            this.$router.push({ name: "admin.roles" });
        },
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
            this.selectedPermissions = [];
        },
        createPermission(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/permission_options`, params).then((res) => {
                this.selectedPermissions.push(res.data.data);
            });
        },
    },
};
</script>
