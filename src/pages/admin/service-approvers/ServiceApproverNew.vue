<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onCreateSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        New Service Approver
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
                        <!-- service -->
                        <div class="sm:col-span-6">
                            <label
                                for="service"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Service
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

                        <!-- requisitions -->
                        <div class="sm:col-span-6">
                            <label
                                for="requisition"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Requisitions
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedRequisitions"
                                    :options="requisitions"
                                    :multiple="true"
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
                                    >
                                </VueMultiselect>
                            </div>
                        </div>

                        <!-- approvers -->
                        <div class="sm:col-span-6">
                            <label
                                for="final_approval"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Approvers
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedApprovers"
                                    :options="approvers"
                                    :multiple="true"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createApprover"
                                    @search-change="loadApprovers"
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
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            services: [],
            selectedServices: [],
            serviceTimeout: null,

            approvers: [],
            selectedApprovers: [],
            approverTimeout: null,

            requisitions: [],
            selectedRequisitions: [],
            requisitionTimeout: null,

            schema: {},

            service: {
                service_id: "",
                requisitions: [],
                approvers: [],
                description: "",
                is_active: false,
            },
        };
    },
    created() {
        this.loadServices();
        this.loadRequisitions();
        this.loadApprovers();
    },
    methods: {
        onCreateSubmit(values, actions) {
            let data = {
                service_id: this.selectedServices
                    ? this.selectedServices.id
                    : null,
                requisitions: this.selectedRequisitions
                    ? this.selectedRequisitions.map((per) => per.id)
                    : [],
                approvers: this.selectedApprovers
                    ? this.selectedApprovers.map((per) => per.id)
                    : [],
                description: this.service.description,
                is_active: this.service.is_active,
            };

            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminServiceApprover/create", data).then(
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
                            "The combination of approver and service has already been taken.";
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
            this.service.name = null;
            this.service.description = null;
            this.selectedServices = [];
            this.selectedRequisitions = [];
            this.selectedApprovers = [];
            this.service.is_active = false;
        },
        handleCancel() {
            this.$router.push({ name: "admin.service_approvers" });
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

        loadApprovers(search) {
            const params = {
                search: search,
            };
            if (this.approverTimeout) {
                clearInterval(this.approverTimeout);
            }
            this.loading = true;
            this.approverTimeout = setTimeout(() => {
                axios.get(`/api/v1/user_options`, { params }).then((res) => {
                    this.approvers = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
        clearApprovers() {
            this.selectedApprovers = [];
        },
        createApprover(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/user_options`, params).then((res) => {
                this.selectedApprovers.push(res.data.data);
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
            this.selectedRequisitions = [];
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
