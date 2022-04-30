<template>
    <div class="min-h-full flex flex-col justify-center py-2 sm:px-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full">
            <p
                class="sm:mx-auto sm:w-full sm:max-w-md mt-2 pt-2 scroll-pb-20 w-full text-xl text-gray-900 text-center font-bold"
            >
                Service Request
            </p>
        </div>
        <VeeForm
            :validation-schema="schema"
            class="mt-2 mb-8 flex flex-col justify-center items-center"
            @submit="onCreateSubmit"
        >
            <div class="space-y-8 divide-y divide-gray-200 lg:w-1/2">
                <div class="p-4">
                    <div
                        class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
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

                        <!-- company name -->
                        <div class="sm:col-span-3">
                            <label
                                for="company_name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Company name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="company_name"
                                    v-model="profile.company_name"
                                    type="text"
                                    name="company_name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Contact name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="name"
                                    v-model="profile.name"
                                    type="text"
                                    name="name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- region -->
                        <div class="sm:col-span-3">
                            <label
                                for="region"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Region
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    v-model="profile.region_id"
                                    as="select"
                                    name="region"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                    @change="fetchZone($event)"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            region, index
                                        ) in ticket.regions"
                                        :key="index"
                                        :value="region.id"
                                    >
                                        {{ region.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="region"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label
                                for="zone"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Zone
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    v-model="profile.zone_id"
                                    as="select"
                                    name="zone"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                    @change="fetchWoreda($event)"
                                >
                                    <option value="" selected>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(zone, index) in ticket.zones"
                                        :key="index"
                                        :value="zone.id"
                                    >
                                        {{ zone.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="zone"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label
                                for="woreda"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Woreda
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="woreda"
                                    v-model="profile.woreda_id"
                                    as="select"
                                    name="woreda"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            woreda, index
                                        ) in ticket.woredas"
                                        :key="index"
                                        :value="woreda.id"
                                    >
                                        {{ woreda.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="woreda"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-3"></div>
                        <!-- location -->
                        <div class="sm:col-span-3">
                            <label
                                for="location"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Specific location
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="location"
                                    v-model="profile.location"
                                    type="text"
                                    name="location"
                                    rules="required"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                            <ErrorMessage
                                name="location"
                                class="text-red-600"
                            />
                        </div>
                        <!-- building -->
                        <div class="sm:col-span-3">
                            <label
                                for="building"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Building name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="building"
                                    v-model="profile.building"
                                    type="text"
                                    name="building"
                                    rules="required"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    name="building"
                                    class="text-red-600"
                                />
                            </div>
                        </div>
                        <!-- request -->
                        <div class="sm:col-span-3">
                            <label
                                for="requisition"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Request
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="requisition"
                                    v-model="ticket.requisition_id"
                                    as="select"
                                    name="requisition"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                    @change="fetchService($event)"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            requisition, index
                                        ) in ticket.requisitions"
                                        :key="index"
                                        :value="requisition.id"
                                    >
                                        {{ requisition.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="requisition"
                                />
                            </div>
                        </div>

                        <!-- service -->
                        <div class="sm:col-span-3">
                            <label
                                for="service"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Service
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="service"
                                    v-model="ticket.service_id"
                                    as="select"
                                    name="service"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                    @change="fetchRequirement($event)"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            service, index
                                        ) in ticket.services"
                                        :key="index"
                                        :value="service.id"
                                    >
                                        {{ service.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="service"
                                />
                            </div>
                        </div>
                        <div
                            v-for="(requirement, index) in ticket.requirements"
                            :key="index"
                            class="sm:col-span-6"
                        >
                            <div v-if="requirement.type === 'file'">
                                <FileUpload
                                    :file-name="requirement.name"
                                    :accept="requirement.accept"
                                    :read-only="false"
                                    :is-required="requirement.is_required"
                                    :size="requirement.size"
                                    @update-file="handleAttachments"
                                />

                                <!-- template -->
                                <div
                                    v-for="(
                                        fileTemplate, newFileIndx
                                    ) in requirement.files"
                                    :key="newFileIndx"
                                    class="sm:col-span-6"
                                >
                                    <FileDownload
                                        :file-name="fileTemplate.file_name"
                                        :name="fileTemplate.name"
                                        :requested-file="
                                            fileTemplate.requested_file
                                        "
                                        :path="fileTemplate.path"
                                        :read-only="false"
                                        :end-point="endPoint"
                                        @download-attachment="
                                            downloadAttachment
                                        "
                                    />
                                </div>
                            </div>
                        </div>
                        <!-- end of attachment -->

                        <!-- description -->
                        <div class="sm:col-span-6">
                            <label
                                for="comment"
                                class="block text-sm font-medium text-gray-700"
                                >Description</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="comment"
                                    v-model="ticket.comment"
                                    rows="4"
                                    name="comment"
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- submit button -->
            <div class="pt-5 pb-3">
                <div class="flex justify-end">
                    <button
                        type="button"
                        class="bg-red py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        @click.prevent="handleCancel"
                    >
                        Cancel
                    </button>
                    <!-- :disabled="submission" -->
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
import FileUpload from "../../FileUpload.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import axios from "axios";
import FileDownload from "../../FileDownload.vue";

export default {
    components: {
        FileUpload,
        ErrorAlert,
        SuccessAlert,
        FileDownload,
    },
    data() {
        return {
            endPoint: "clientTicket",
            loading: false,
            submission: false,
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",

            schema: {
                region: "required",
                zone: "required",
                woreda: "required",
                location: "required",
                building: "required",
                requisition: "required",
                service: "required",
            },

            ticket: {
                company_name: "",
                name: "",
                region_id: "",
                zone_id: "",
                woreda_id: "",
                location: "",
                building: "",
                requisition_id: "",
                service_id: "",
                requirement_id: "",
                comment: "",
                templates: [],
                files: [],

                regions: [],
                zones: [],
                woredas: [],

                requisitions: [],
                services: [],
                requirements: [],
            },

            profile: {
                company_name: "",
                name: "",
                region_id: "",
                zone_id: "",
                woreda_id: "",
                location: "",
                building: "",
            },
        };
    },
    created() {
        this.loadRegions();
        this.loadRequisitions();
        this.fetchProfile();
    },

    methods: {
        downloadAttachment() {},
        handleAttachments() {},
        handleCancel() {
            this.$router.push({ name: "client.tickets" });
        },
        fetchProfile() {
            this.loading = true;
            this.$store.dispatch("clientAuth/fetchProfile").then(
                (response) => {
                    this.loading = false;
                    if (response.data) {
                        this.profile = response.data.data;
                        if (this.profile && this.profile.region_id) {
                            this.loadZones(this.profile.region_id);
                        }
                        if (this.profile && this.profile.zone_id) {
                            this.loadWoredas(this.profile.zone_id);
                        }
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

        onCreateSubmit(values, actions) {
            let formData = new FormData();

            // file validation
            for (let i = 0; i < this.ticket.requirements.length; i++) {
                let allowedMaxFileSize = this.ticket.requirements[i].size;
                let file = document.getElementById(
                    this.ticket.requirements[i].name
                ).files[0];
                if (this.ticket.requirements[i].is_required && !file) {
                    alert(
                        "Please attach " +
                            this.ticket.requirements[i].name +
                            " file"
                    );
                    return;
                }
                if (file && file.size > 1024 * 1024 * allowedMaxFileSize) {
                    alert(
                        file.name +
                            " " +
                            "file too big ( >" +
                            allowedMaxFileSize +
                            "MB )"
                    );
                    return;
                }
            }

            for (let i = 0; i < this.ticket.requirements.length; i++) {
                if (
                    !this.isNullOrEmpty(
                        document.getElementById(
                            this.ticket.requirements[i].name
                        ).files[0]
                    )
                ) {
                    formData.append(
                        "files[" + this.ticket.requirements[i].name + "]",
                        document.getElementById(
                            this.ticket.requirements[i].name
                        ).files[0]
                    );
                }
            }

            // formData.append("company_name", values.company_name);
            // formData.append("name", values.name);
            formData.append("region_id", values.region);
            formData.append("zone_id", values.zone);
            formData.append("woreda_id", values.woreda);
            formData.append("location", values.location);
            formData.append("building", values.building);
            formData.append("requisition_id", values.requisition);
            formData.append("service_id", values.service);
            formData.append("comment", this.ticket.comment);
            this.submission = true;
            this.loading = true;

            this.$store.dispatch("clientTicket/create", formData).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.show_alert = true;
                        this.alert_success_message = response.data.message;
                        actions.resetForm(); // 👈 Reset Form
                        this.reset();
                    } else if (response.data && !response.data.success) {
                        this.show_alert = true;
                        this.alert_error_message = response.data.message;
                    } else {
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (error) => {
                    if (error.response.status == 403) {
                        this.show_alert = true;
                        this.alert_error_message = error.response.data.message;
                    } else {
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                    this.loading = false;
                }
            );
        },
        fetchZone(event) {
            this.profile.zone_id = "";
            this.ticket.zones = "";
            this.woredas = "";
            this.loadZones(event.target ? event.target.value : event);
        },
        fetchWoreda(event) {
            this.profile.woreda_id = "";
            this.ticket.woredas = "";
            this.loadWoredas(event.target ? event.target.value : event);
        },
        fetchService(event) {
            this.ticket.services = "";
            this.loadServices(event.target ? event.target.value : event);
        },
        fetchRequirement(event) {
            this.ticket.requirements = "";
            this.loadRequirements(event.target ? event.target.value : event);
        },
        handleDismissNotification() {
            this.alert_success_message = "";
            this.alert_error_message = "";
        },
        reset() {
            this.loading = false;
            this.submission = true;
            this.show_alert = false;
            this.profile.company_name = "";
            this.profile.name = "";
            this.ticket.regions = "";
            this.ticket.zones = "";
            this.ticket.woredas = "";
            this.ticket.services = [];
            this.ticket.requisitions = [];
            this.ticket.requirements = [];
            this.ticket.files = [];
            this.ticket.comment = "";
        },
        // region
        loadRegions(search) {
            const params = {
                search: search,
            };
            if (this.regionTimeout) {
                clearInterval(this.regionTimeout);
            }
            this.loading = true;
            this.regionTimeout = setTimeout(() => {
                axios.get(`/api/v1/region_options`, { params }).then((res) => {
                    this.ticket.regions = res.data.data ?? "";
                    this.loading = false;
                });
            }, 300);
        },

        // zone
        loadZones(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/zone_options`, { params }).then((res) => {
                this.ticket.zones = res.data.data ?? "";
                this.loading = false;
            });
        },

        // woreda
        loadWoredas(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/woreda_options`, { params }).then((res) => {
                this.ticket.woredas = res.data.data ?? "";
                this.loading = false;
            });
        },

        // request
        loadRequisitions(search) {
            this.loadServices();
            this.ticket.services = "";
            this.ticket.requirements = "";
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/requisition_options`, { params }).then((res) => {
                // this.loadServices();
                this.ticket.requisitions = res.data.data ?? "";
                this.loading = false;
            });
        },

        // service
        loadServices(search) {
            this.loadRequirements();
            this.ticket.services = "";
            this.ticket.requirements = "";
            const params = {
                search: search,
            };
            this.loading = true;
            axios
                .get(`/api/v1/requisition_service_options`, { params })
                .then((res) => {
                    this.ticket.services = res.data.data ?? "";
                    this.loading = false;
                });
        },
        // requirement
        loadRequirements(search) {
            this.ticket.requirements = "";
            const params = {
                search: search,
                requisition_id: this.ticket.requisition_id,
                service_id: this.ticket.service_id,
            };
            this.loading = true;
            axios
                .get(`/api/v1/requisition_requirement_options`, { params })
                .then((res) => {
                    this.ticket.requirements = res.data.data ?? "";
                    this.loading = false;
                });
        },
    },
};
</script>
