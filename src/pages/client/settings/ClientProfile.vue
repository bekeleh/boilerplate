<template>
    <div class="mt-10 p-6 sm:mt-0">
        <div class="sm:col-span-6">
            <div v-if="alert_success_message">
                <SuccessAlert
                    :alert="alert_success_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
            <div v-if="alert_error_message">
                <ErrorAlert
                    :alert="alert_error_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
        </div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Personal Information
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        Please use a permanent address (mobile number and email)
                        where you can receive SMS and notification.
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <VeeForm :validation-schema="schema" @submit="updateProfile">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="md:grid md:grid-cols-6 md:gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="company_name"
                                        class="block text-sm font-medium text-gray-700"
                                        >Company name</label
                                    >
                                    <input
                                        id="company_name"
                                        v-model="profile.company_name"
                                        type="text"
                                        name="company_name"
                                        readonly
                                        autocomplete="company_name"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <!-- <ErrorMessage
                                    class="text-red-600"
                                    name="company_name"
                                /> -->
                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="first-name"
                                        class="block text-sm font-medium text-gray-700"
                                        >Contact full name</label
                                    >
                                    <input
                                        id="name"
                                        v-model="profile.name"
                                        type="text"
                                        name="name"
                                        autocomplete="name"
                                        readonly
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <!-- <ErrorMessage
                                        class="text-red-600"
                                        name="name"
                                    /> -->

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="phone"
                                        class="block text-sm font-medium text-gray-700"
                                        >Mobile number</label
                                    >
                                    <input
                                        id="phone"
                                        v-model="profile.phone"
                                        type="text"
                                        name="phone"
                                        readonly
                                        autocomplete="phone"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                                <!--
                                                                    <ErrorMessage
                                        class="text-red-600"
                                        name="phone"
                                    /> -->

                                <div class="col-span-6 sm:col-span-4">
                                    <label
                                        for="email"
                                        class="block text-sm font-medium text-gray-700"
                                        >Email address</label
                                    >
                                    <input
                                        id="email"
                                        v-model="profile.email"
                                        type="text"
                                        readonly
                                        name="email"
                                        autocomplete="email"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>

                                <div
                                    class="col-span-6 sm:col-span-6 lg:col-span-3"
                                >
                                    <label
                                        for="zone"
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
                                            <option value="">
                                                Please select
                                            </option>
                                            <option
                                                v-for="(
                                                    region, index
                                                ) in regions"
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

                                <div
                                    class="col-span-6 sm:col-span-3 lg:col-span-2"
                                >
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
                                            <option value="">
                                                Please select
                                            </option>
                                            <option
                                                v-for="(zone, index) in zones"
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
                                <div
                                    class="col-span-6 sm:col-span-3 lg:col-span-2"
                                >
                                    <label
                                        for="woreda"
                                        class="block text-sm font-medium text-gray-700"
                                    >
                                        Woreda
                                    </label>
                                    <div class="mt-1">
                                        <VeeField
                                            v-model="profile.woreda_id"
                                            as="select"
                                            name="woreda"
                                            class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                        >
                                            <option value="">
                                                Please select
                                            </option>
                                            <option
                                                v-for="(
                                                    woreda, index
                                                ) in woredas"
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

                                <div
                                    class="col-span-6 sm:col-span-6 lg:col-span-2"
                                >
                                    <label
                                        for="location"
                                        class="block text-sm font-medium text-gray-700"
                                        >Specific location</label
                                    >
                                    <VeeField
                                        id="location"
                                        v-model="profile.location"
                                        type="text"
                                        name="location"
                                        autocomplete="location"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="location"
                                    />
                                </div>

                                <div
                                    class="col-span-6 sm:col-span-6 lg:col-span-2"
                                >
                                    <label
                                        for="building"
                                        class="block text-sm font-medium text-gray-700"
                                        >Building name</label
                                    >
                                    <VeeField
                                        id="building"
                                        v-model="profile.building"
                                        type="text"
                                        name="building"
                                        autocomplete="building"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="building"
                                    />
                                </div>

                                <div
                                    class="col-span-6 sm:col-span-6 lg:col-span-2"
                                >
                                    <label
                                        for="street-address"
                                        class="block text-sm font-medium text-gray-700"
                                        >Street address</label
                                    >
                                    <VeeField
                                        id="address"
                                        v-model="profile.address"
                                        type="text"
                                        name="address"
                                        autocomplete="address"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="address"
                                    />
                                </div>
                                <div
                                    class="col-span-6 sm:col-span-6 lg:col-span-2"
                                >
                                    <label
                                        for="city"
                                        class="block text-sm font-medium text-gray-700"
                                        >City</label
                                    >
                                    <VeeField
                                        id="city"
                                        v-model="profile.city"
                                        type="text"
                                        name="city"
                                        autocomplete="address-level2"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="city"
                                    />
                                </div>

                                <div
                                    class="col-span-6 sm:col-span-3 lg:col-span-2"
                                >
                                    <label
                                        for="postal-code"
                                        class="block text-sm font-medium text-gray-700"
                                        >ZIP / Postal code</label
                                    >
                                    <VeeField
                                        id="code"
                                        v-model="profile.zip"
                                        type="text"
                                        name="code"
                                        autocomplete="code"
                                        class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                :submission="submission"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import SuccessAlert from "../../alerts/SuccessAlert";
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        return {
            loading: false,
            submission: false,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            // company_name: "required",
            // name: "required",
            // phone: "required",
            schema: {
                address: "required",
                city: "required",
                region: "required",
                zone: "required",
                woreda: "required",
                location: "required",
                building: "required",
            },

            profile: {
                company_name: "",
                name: "",
                phone: "",
                email: "",
                adress: "",
                city: "",
                zip: "",
                region_id: "",
                zone_id: "",
                woreda_id: "",
                location: "",
                building: "",
            },

            regions: [],
            zones: [],
            woredas: [],
        };
    },
    created() {
        this.loadRegions();
        this.fetchProfile();
    },
    methods: {
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
        updateProfile(values) {
            let data = {
                company_name: values.company_name,
                name: values.name,
                phone: values.phone,
                address: values.address,
                city: values.city,
                zip: values.code,
                region_id: this.profile.region_id,
                zone_id: this.profile.zone_id,
                woreda_id: this.profile.woreda_id,
                location: this.profile.location,
                building: this.profile.building,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("clientAuth/updateProfile", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.alert_success_message = response.data.message;
                    } else {
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (error) => {
                    this.loading = false;
                    if (!error.response.data.success) {
                        this.alert_success_message = error.response.data.errors;
                    } else {
                        this.alert_success_message =
                            "Whoops, looks like something went wrong";
                    }
                }
            );
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        fetchZone(event) {
            this.profile.zones = "";
            this.woredas = "";
            this.loadZones(event.target ? event.target.value : event);
        },
        fetchWoreda(event) {
            this.profile.woredas = "";
            this.loadWoredas(event.target ? event.target.value : event);
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
                    this.regions = res.data.data ?? [];
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
                this.zones = res.data.data ?? [];
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
                this.woredas = res.data.data ?? [];
                this.loading = false;
            });
        },
    },
};
</script>
