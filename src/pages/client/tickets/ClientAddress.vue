<template>
    <div class="p-4">
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
                <label
                    for="region"
                    class="block text-sm font-medium text-gray-700"
                >
                    Region
                </label>
                <div class="mt-1">
                    <VeeField
                        v-model="ticket.region_id"
                        as="select"
                        name="region"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                        @change="fetchZone($event)"
                    >
                        <option value="">Please select</option>
                        <option
                            v-for="(region, index) in ticket.regions"
                            :key="index"
                            :value="region.id"
                        >
                            {{ region.name }}
                        </option>
                    </VeeField>
                    <ErrorMessage class="text-red-600" name="region" />
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
                        v-model="ticket.zone_id"
                        as="select"
                        name="zone"
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
                    </VeeField>
                    <ErrorMessage class="text-red-600" name="zone" />
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
                        v-model="ticket.woreda_id"
                        as="select"
                        name="woreda"
                        class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                    >
                        <option value="">Please select</option>
                        <option
                            v-for="(woreda, index) in ticket.woredas"
                            :key="index"
                            :value="woreda.id"
                        >
                            {{ woreda.name }}
                        </option>
                    </VeeField>
                    <ErrorMessage class="text-red-600" name="woreda" />
                </div>
            </div>
            <div class="sm:col-span-3"></div>
            <!-- location -->
            <div class="sm:col-span-3">
                <label
                    for="location"
                    class="block text-sm font-medium text-gray-700"
                >
                    Location
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
                <ErrorMessage name="location" class="text-red-600" />
            </div>
            <!-- building -->
            <div class="sm:col-span-3">
                <label
                    for="building"
                    class="block text-sm font-medium text-gray-700"
                >
                    Building
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
                    <ErrorMessage name="building" class="text-red-600" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    components: {},
    props: {
        ticket: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {};
    },
    created() {
        this.loadRegions();
        this.loadRequisitions();
    },

    methods: {
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
        reset() {
            this.loading = false;
            this.submission = true;
            this.show_alert = false;
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
            this.ticket.requirements = [];
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
                    this.loading = false;
                });
        },
    },
};
</script>
