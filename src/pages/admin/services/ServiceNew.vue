<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onCreateSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        New Service
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
                        <div class="sm:col-span-4">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="name"
                                    v-model="service.name"
                                    type="text"
                                    name="name"
                                    autocomplete="given-name"
                                    class="shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="name"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label
                                for="imageUrl"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Image url
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="imageUrl"
                                    v-model="service.imageUrl"
                                    type="text"
                                    name="imageUrl"
                                    autocomplete="imageUrl"
                                    class="shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="imageUrl"
                                />
                            </div>
                        </div>
                        <!-- group -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedCategories"
                                    :options="categories"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createCategory"
                                    @search-change="loadCategories"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                    >
                                </VueMultiselect>
                            </div>
                        </div>

                        <!-- description -->
                        <div class="sm:col-span-6">
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700"
                                >Description</label
                            >
                            <div class="mt-1">
                                <VeeField
                                    id="description"
                                    v-model="service.description"
                                    as="textarea"
                                    rows="4"
                                    name="description"
                                    class="shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="description"
                                />
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
                                v-model="service.is_active"
                                :class="[
                                    service.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        service.is_actives
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
import axios from "axios";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        Switch,
        VueMultiselect,
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        return {
            loading: false,
            submission: false,
            id: null,
            show_alert: null,
            errors: [],
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            categories: [],
            selectedCategories: [],
            categoryTimeout: null,

            schema: {
                name: "required",
                imageUrl: "required",
                description: "required",
            },

            service: {
                id: null,
                name: null,
                imageUrl: null,
                description: null,
                requirements: [],
                is_active: false,
            },
        };
    },
    created() {},
    methods: {
        onCreateSubmit(values, actions) {
            let data = {
                name: this.service.name,
                description: this.service.description,
                imageUrl: this.service.imageUrl,
                is_active: this.service.is_active,
                category_id: this.selectedCategories
                    ? this.selectedCategories.id
                    : null,
            };

            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminService/create", data).then(
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
            this.enabled = false;
            this.service.name = null;
            this.service.description = null;
            this.service.imageUrl = null;
            this.selectedCategories = [];
            this.selectedRequirements = [];
            this.selectedRequisitions = [];
            this.selectedUsers = [];
        },
        handleCancel() {
            this.$router.push({ name: "admin.services" });
        },
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
    },
};
</script>
