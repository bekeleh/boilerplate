<template>
    <div class="min-h-full flex flex-col justify-center py-2 sm:px-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full">
            <p
                class="sm:mx-auto sm:w-full sm:max-w-md mt-2 pt-2 scroll-pb-20 w-full text-xl text-gray-900 text-center font-bold"
            >
                Service Request Details
            </p>
        </div>
        <VeeForm class="mt-2 mb-8 flex flex-col justify-center items-center">
            <div class="space-y-8 divide-y divide-gray-200 lg:w-1/2">
                <div class="p-4">
                    <div
                        class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
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
                                >
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
                                >
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
                                    name="woreda"
                                    disabled
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
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
                                <input
                                    id="location"
                                    v-model="ticket.location"
                                    type="text"
                                    name="location"
                                    disabled
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
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
                                <input
                                    id="building"
                                    v-model="ticket.building"
                                    type="text"
                                    name="building"
                                    readonly
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
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
                                <select
                                    id="requisition"
                                    v-model="ticket.requisition_id"
                                    name="requisition"
                                    disabled
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option
                                        v-for="(
                                            requisition, index
                                        ) in ticket.requisitions"
                                        :key="index"
                                        :value="requisition.id"
                                    >
                                        {{ requisition.name }}
                                    </option>
                                </select>
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
                                <select
                                    id="service"
                                    v-model="ticket.service_id"
                                    name="service"
                                    disabled
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option
                                        v-for="(
                                            service, index
                                        ) in ticket.services"
                                        :key="index"
                                        :value="service.id"
                                    >
                                        {{ service.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div
                            v-for="(file, index) in files"
                            :key="index"
                            class="sm:col-span-6"
                        >
                            <FileDownload
                                :file-name="file.file_name"
                                :name="file.name"
                                :requested-file="file.pivot.requested_file"
                                :path="file.path"
                                :read-only="false"
                                :end-point="endPoint"
                                @download-attachment="downloadAttachment"
                            />
                        </div>
                        <div
                            v-for="(newFile, index) in newFiles"
                            :key="index"
                            class="sm:col-span-6"
                        >
                            <FileUpload
                                :file-name="newFile.name"
                                :read-only="true"
                                :accept="newFile.accept"
                                :size="newFile.size"
                                @update-file="handleAttachments"
                            />
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
                                    readonly
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
                        @click.prevent="backToTicketApprovals"
                    >
                        Back
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>

<script>
import FileDownload from "../../FileDownload.vue";
import FileUpload from "../../FileUpload.vue";
import axios from "axios";

export default {
    components: {
        FileDownload,
        FileUpload,
    },
    data() {
        return {
            loading: false,
            endPoint: "adminTicket",
            slug: null,

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
                region_id: null,
                zone_id: null,
                woreda_id: null,
                location: null,
                building: null,
                requisition_id: null,
                service_id: null,
                requirement_id: null,
                comment: null,

                // files: [],
                regions: [],
                zones: [],
                woredas: [],
                requisitions: [],
                services: [],
                // requirements: [],
            },
        };
    },
    computed: {
        files() {
            return this.$store.state.adminTicket.files;
        },

        requirements() {
            return this.$store.state.adminTicket.requirements;
        },

        newFiles() {
            return this.$store.state.adminTicket.newFiles;
        },
    },
    created() {
        this.slug = this.$route.params.slug;
        if (this.slug) {
            this.fetchTicket();
            this.loadRegions();
            this.loadRequisitions();
        }
        this.$store.commit("adminTicket/ticketRequirements", []);
        this.$store.commit("adminTicket/ticketFiles", []);
    },

    methods: {
        downloadAttachment(name) {
            this.$store.dispatch("adminTicket/downloadAttachment", name).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
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
        handleAttachments() {},
        fetchTicket() {
            let params = {
                id: this.$route.params.id,
                slug: this.slug,
            };
            this.loading = true;
            this.$store.dispatch("adminTicket/fetchTicketById", params).then(
                (response) => {
                    this.loading = false;
                    if (response.data) {
                        this.ticket = response.data.data;
                        this.$store.commit(
                            "adminTicket/ticketRequirements",
                            this.ticket.requirements
                        );
                        this.$store.commit(
                            "adminTicket/ticketFiles",
                            this.ticket.files
                        );
                        this.$store.commit("adminTicket/changeTicketFile");
                        if (this.ticket.region_id) {
                            this.fetchZone(this.ticket.region_id);
                        }
                        if (this.ticket.zone_id) {
                            this.fetchWoreda(this.ticket.zone_id);
                        }
                        if (this.ticket.requisition_id) {
                            this.fetchService(this.ticket.requisition_id);
                        }
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

        backToTicketApprovals() {
            this.$router.push({ name: "admin.tickets.approval" });
        },

        fetchZone(event) {
            this.ticket.zones = "";
            this.woredas = "";
            this.loadZones(event.target ? event.target.value : event);
        },
        fetchWoreda(event) {
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
            this.alert_success_message = null;
            this.alert_error_message = null;
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
                    this.ticket.regions = res.data.data;
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
                this.ticket.zones = res.data.data;
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
                this.ticket.woredas = res.data.data;
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
                this.ticket.requisitions = res.data.data;
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
                    this.ticket.services = res.data.data;
                    this.loading = false;
                });
        },
        // requirement
        loadRequirements(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios
                .get(`/api/v1/requisition_requirement_options`, { params })
                .then((res) => {
                    this.ticket.requirements = res.data.data;
                    this.$store.commit(
                        "adminTicket/ticketRequirements",
                        this.ticket.requirements
                    );
                    this.$store.commit("adminTicket/changeTicketFile");
                    this.loading = false;
                });
        },
    },
};
</script>
