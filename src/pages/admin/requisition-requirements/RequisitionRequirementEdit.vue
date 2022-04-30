<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Edit Requisition Requirement
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-6">
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
                        <!-- requisition -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Requisition
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedRequisitions"
                                    :options="requisitions"
                                    :multiple="false"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createRequisition"
                                    @search-change="loadRequisitions"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                </VueMultiselect>
                            </div>
                        </div>
                        <!-- service -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Services
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedServices"
                                    :options="services"
                                    :multiple="false"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createService"
                                    @search-change="loadServices"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                    >
                                </VueMultiselect>
                            </div>
                        </div>

                        <!-- requirement -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Requirements
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedRequirements"
                                    :options="requirements"
                                    :multiple="true"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createRequirement"
                                    @search-change="loadRequirements"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
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
                                v-model="requisition.is_active"
                                :class="[
                                    requisition.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        requisition.is_active
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
            id: "",
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",

            requisitions: [],
            selectedRequisitions: [],
            requisitionTimeout: "",

            services: [],
            selectedServices: [],
            serviceTimeout: "",

            requirements: [],
            selectedRequirements: [],
            requirementTimeout: "",

            schema: {},

            requisition: {
                id: "",
                name: "",
                is_active: false,
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchRequisition(this.id);
        this.loadRequirements();
        this.loadRequisitions();
    },
    methods: {
        fetchRequisition(id) {
            this.$store
                .dispatch(
                    "adminRequisitionRequirement/fetchRequisitionRequirementById",
                    id
                )
                .then(
                    (response) => {
                        this.requisition.id = response.data.data.id;
                        this.selectedRequisitions =
                            response.data.data.requisitions;
                        this.selectedServices = response.data.data.services;
                        this.selectedRequirements =
                            response.data.data.requirements;
                        this.requisition.is_active = this.requisition.is_active
                            ? true
                            : false;
                    },
                    (error) => {}
                );
        },
        onEditSubmit(values, actions) {
            const data = {
                name: this.requisition.name,
                is_active: this.requisition.is_active,
                requisition_id: this.selectedRequisitions
                    ? this.selectedRequisitions.map((req) => req.id)[0]
                    : [],
                service_id: this.selectedServices
                    ? this.selectedServices.map((req) => req.id)[0]
                    : [],
                requirements: this.selectedRequirements
                    ? this.selectedRequirements.map((per) => per.id)
                    : [],
            };

            this.submission = true;
            this.loading = true;
            this.$store
                .dispatch("adminRequisitionRequirement/update", {
                    id: this.requisition.id,
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
                        if (error.response.status == 422) {
                            this.alert_error_message =
                                "The combination of requisition and service has already been taken.";
                        } else {
                            this.alert_error_message =
                                "Whoops, looks like something went wrong";
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
            this.selectedRequisitions = [];
            this.selectedServices = [];
            this.selectedRequirements = [];
        },
        handleCancel() {
            this.$router.push({ name: "admin.requisition-requirements" });
        },
        loadServices(search) {
            const params = {
                search: search,
            };
            if (this.serviceTimeout) {
                clearInterval(this.serviceTimeout);
            }
            this.loading = true;
            this.serviceTimeout = setTimeout(() => {
                axios.get(`/api/v1/service_options`, { params }).then((res) => {
                    this.services = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
        clearServices() {
            this.selectedServices = [];
        },
        createService(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/service_options`, params).then((res) => {
                this.selectedServices.push(res.data.data);
            });
        },
        loadRequirements(search) {
            const params = {
                search: search,
            };
            if (this.requirementTimeout) {
                clearInterval(this.requirementTimeout);
            }
            this.loading = true;
            this.requirementTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/requirement_options`, { params })
                    .then((res) => {
                        this.requirements = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },
        clearRequirements() {
            this.selectedRequirements = [];
        },
        createRequirement(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/requirement_options`, params).then((res) => {
                this.selectedRequirements.push(res.data.data);
            });
        },
        loadRequisitions(search) {
            const params = {
                search: search,
            };
            if (this.requisitionTimeout) {
                clearInterval(this.requisitionTimeout);
            }
            this.loading = true;
            this.requisitionTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/requisition_options`, { params })
                    .then((res) => {
                        this.requisitions = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },
        clearRequisitions() {
            this.selectedRequirements = [];
        },
        createRequisition(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/requisition_options`, params).then((res) => {
                this.selectedRequisitions.push(res.data.data);
            });
        },
    },
};
</script>
