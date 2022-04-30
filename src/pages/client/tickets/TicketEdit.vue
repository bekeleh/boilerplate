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
            enctype="multipart/form-data"
            class="mt-2 mb-8 flex flex-col justify-center items-center"
            @submit="onEditSubmit"
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
                                    v-model="ticket.company_name"
                                    type="text"
                                    name="company_name"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- contact name -->
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
                                    v-model="ticket.name"
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
                                <select
                                    v-model="ticket.region_id"
                                    name="region"
                                    disabled
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
                                </select>
                            </div>
                        </div>
                        <!-- zone -->
                        <div class="sm:col-span-3">
                            <label
                                for="zone"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Zone
                            </label>
                            <div class="mt-1">
                                <select
                                    v-model="ticket.zone_id"
                                    name="zone"
                                    disabled
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                    @change="fetchWoreda($event)"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(zone, index) in ticket.zones"
                                        :key="index"
                                        :value="zone.id"
                                    >
                                        {{ zone.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <!-- woreda -->
                        <div class="sm:col-span-3">
                            <label
                                for="woreda"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Woreda
                            </label>
                            <div class="mt-1">
                                <select
                                    id="woreda"
                                    v-model="ticket.woreda_id"
                                    as="select"
                                    name="woreda"
                                    disabled
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
                                </select>
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
                                    v-model="ticket.location"
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
                                    v-model="ticket.building"
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
                            v-for="(file, fileIdx) in files"
                            :key="fileIdx"
                            class="sm:col-span-6"
                        >
                            <ViewFile
                                :file-name="file.file_name"
                                :name="file.name"
                                :read-only="false"
                                :requested-file="file.pivot.requested_file"
                                @remove-attachment="removeAttachment"
                            />
                        </div>
                        <div
                            v-for="(newFile, newFileIdx) in newFiles"
                            :key="newFileIdx"
                            class="sm:col-span-6"
                        >
                            <FileUpload
                                :file-name="newFile.name"
                                :accept="newFile.accept"
                                :read-only="false"
                                :is-required="newFile.is_required"
                                :size="newFile.size"
                                @update-file="handleAttachments"
                            />
                            <!-- template -->
                            <div
                                v-for="(template, tempIdx) in newFile.files"
                                :key="tempIdx"
                                class="sm:col-span-6"
                            >
                                <FileDownload
                                    :file-name="template.file_name"
                                    :name="template.name"
                                    :requested-file="template.requested_file"
                                    :path="template.path"
                                    :read-only="false"
                                    :end-point="endPoint"
                                    @download-attachment="downloadAttachment"
                                />
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
                                <!-- :disabled="ticket.status_id != '1'" -->
                                <textarea
                                    id="comment"
                                    v-model="ticket.comment"
                                    rows="4"
                                    name="comment"
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- end of location -->
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
                        type="submit"
                        :disabled="submission"
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
import ViewFile from "../../FilePreview.vue";
import FileDownload from "../../FileDownload.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import axios from "axios";
export default {
    components: {
        FileUpload,
        ViewFile,
        FileDownload,
        ErrorAlert,
        SuccessAlert,
    },
    data() {
        return {
            endPoint: "clientTicket",
            loading: false,
            submission: false,
            slug: "",
            id: "",
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",
            // region: "required",
            // zone: "required",
            // woreda: "required",
            schema: {
                location: "required",
                building: "required",
                requisition: "required",
                service: "required",
            },
            ticket: {
                id: "",
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
                // files: [],
                regions: [],
                zones: [],
                woredas: [],
                requisitions: [],
                services: [],
                requirements: [],
            },
        };
    },
    computed: {
        files() {
            return this.$store.state.clientTicket.files;
        },
        requirements() {
            return this.$store.state.clientTicket.requirements;
        },
        newFiles() {
            return this.$store.state.clientTicket.newFiles;
        },
    },
    created() {
        this.slug = this.$route.params.slug;
        this.id = this.$route.params.id;

        this.fetchTicket();
        this.loadRegions();
        this.loadRequisitions();

        this.$store.commit("clientTicket/ticketRequirements", []);
        this.$store.commit("clientTicket/ticketFiles", []);
    },
    methods: {
        removeAttachment(name) {
            this.$store.dispatch("clientTicket/removeAttachment", name).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.loadRequirements();
                        this.show_alert = true;
                        this.alert_success_message = response.data.message;
                    } else {
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message =
                        "Whoops, looks like something went wrong";
                }
            );
        },
        downloadAttachment() {},
        handleAttachments() {},
        fetchTicket() {
            this.loading = true;
            this.$store
                .dispatch("clientTicket/fetchTicketById", {
                    slug: this.$route.params.slug,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data) {
                            this.ticket = response.data.data;
                            if (this.ticket.region_id) {
                                this.fetchZone(this.ticket.region_id);
                            }
                            if (this.ticket.zone_id) {
                                this.fetchWoreda(this.ticket.zone_id);
                            }
                            if (this.ticket.requisition_id) {
                                this.fetchService(this.ticket.requisition_id);
                            }
                            this.loadRequirements();
                            this.$store.commit(
                                "clientTicket/ticketRequirements",
                                this.ticket.requirements
                            );
                            this.$store.commit(
                                "clientTicket/ticketFiles",
                                this.ticket.files
                            );
                            this.$store.commit("clientTicket/changeTicketFile");
                        } else {
                            this.loading = false;
                            this.alert_error_message =
                                "Whoops, looks like something went wrong";
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.show_alert = true;
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                );
        },
        handleCancel() {
            this.$router.push({ name: "client.tickets" });
        },
        onEditSubmit(values, actions) {
            let formData = new FormData();
            // file validation
            for (let i = 0; i < this.newFiles.length; i++) {
                let allowedMaxFileSize = this.newFiles[i].size;
                let file = document.getElementById(this.newFiles[i].name)
                    .files[0];
                if (this.newFiles[i].is_required && !file) {
                    alert("Please attach " + this.newFiles[i].name + " file");
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

                if (file && file.size < 100) {
                    alert(file.name + " " + "file too small or empty");
                    return;
                }
            }
            for (let i = 0; i < this.newFiles.length; i++) {
                let file = document.getElementById(this.newFiles[i].name)
                    .files[0];
                formData.append("files[" + this.newFiles[i].name + "]", file);
            }
            // formData.append("company_name", values.company_name);
            // formData.append("name", values.name);
            // formData.append("region_id", values.region);
            // formData.append("zone_id", values.zone);
            // formData.append("woreda_id", values.woreda);
            formData.append("location", values.location);
            formData.append("building", values.building);
            formData.append("requisition_id", values.requisition);
            formData.append("service_id", values.service);
            formData.append("id", this.ticket.id);
            formData.append("comment", this.ticket.comment);
            this.submission = true;
            this.loading = true;
            this.$store
                .dispatch("clientTicket/update", {
                    id: this.ticket.id,
                    data: formData,
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
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                );
        },
        fetchZone(event) {
            // this.ticket.zone_id = "";
            // this.ticket.woreda_id = "";
            this.ticket.zones = "";
            this.woredas = "";
            this.loadZones(event.target ? event.target.value : event);
        },
        fetchWoreda(event) {
            // this.ticket.woreda_id = "";
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
            this.newFiles = [];
            this.files = [];
            this.ticket.company_name = "";
            this.ticket.name = "";
            this.ticket.regions = [];
            this.ticket.zones = [];
            this.ticket.woredas = [];
            this.ticket.services = [];
            this.ticket.requisitions = [];
            this.ticket.requirements = [];
            this.ticket.files = [];
            this.ticket.comment = "";
            this.$store.commit("clientTicket/ticketRequirements", []);
            this.$store.commit("clientTicket/ticketFiles", []);
            this.$store.commit("clientTicket/ticketNewFiles", []);
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
                    this.ticket.regions = res.data.data ?? [];
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
                this.ticket.zones = res.data.data ?? [];
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
                this.ticket.woredas = res.data.data ?? [];
                this.loading = false;
            });
        },
        // request
        loadRequisitions(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/requisition_options`, { params }).then((res) => {
                this.ticket.requisitions = res.data.data ?? [];
                this.loading = false;
            });
        },
        // service
        loadServices(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios
                .get(`/api/v1/requisition_service_options`, { params })
                .then((res) => {
                    this.ticket.services = res.data.data ?? [];
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
                    this.ticket.requirements = res.data.data ?? [];
                    this.$store.commit(
                        "clientTicket/ticketRequirements",
                        this.ticket.requirements
                    );
                    this.$store.commit("clientTicket/changeTicketFile");
                    this.loading = false;
                });
        },
    },
};
</script>
