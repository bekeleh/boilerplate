<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm>
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Activity log details
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
                        <!-- log name -->
                        <div class="sm:col-span-6">
                            <label
                                for="log_name"
                                class="block text-sm font-medium text-gray-700"
                                >Log name</label
                            >
                            <div class="mt-1">
                                <input
                                    id="log_name"
                                    v-model="activity_log.log_name"
                                    name="log_name"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- subject -->
                        <div class="sm:col-span-6">
                            <label
                                for="subject_type"
                                class="block text-sm font-medium text-gray-700"
                                >Subject type</label
                            >
                            <div class="mt-1">
                                <input
                                    id="subject_type"
                                    v-model="activity_log.subject_type"
                                    rows="4"
                                    name="subject_type"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label
                                for="subject_id"
                                class="block text-sm font-medium text-gray-700"
                                >Subject id</label
                            >
                            <div class="mt-1">
                                <input
                                    id="subject_id"
                                    v-model="activity_log.subject_id"
                                    rows="4"
                                    name="subject_id"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- causer -->
                        <div class="sm:col-span-6">
                            <label
                                for="causer_type"
                                class="block text-sm font-medium text-gray-700"
                                >Causer type</label
                            >
                            <div class="mt-1">
                                <input
                                    id="causer_type"
                                    v-model="activity_log.causer_type"
                                    rows="4"
                                    name="causer_type"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-6">
                            <label
                                for="causer_id"
                                class="block text-sm font-medium text-gray-700"
                                >Causer id</label
                            >
                            <div class="mt-1">
                                <input
                                    id="causer_id"
                                    v-model="activity_log.causer_id"
                                    rows="4"
                                    name="causer_id"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- properties -->
                        <div class="sm:col-span-6">
                            <label
                                for="properties"
                                class="block text-sm font-medium text-gray-700"
                                >Properties</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="properties"
                                    v-model="activity_log.properties"
                                    rows="4"
                                    name="properties"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
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
                                <textarea
                                    id="description"
                                    v-model="activity_log.description"
                                    rows="4"
                                    name="description"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- created at -->
                        <div class="sm:col-span-6">
                            <label
                                for="created_at"
                                class="block text-sm font-medium text-gray-700"
                                >Created at</label
                            >
                            <div class="mt-1">
                                <input
                                    id="created_at"
                                    v-model="fromNowOn"
                                    name="created_at"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
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
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import { ref } from "vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import "vue-multiselect/dist/vue-multiselect.css";

export default {
    components: {
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        const enabled = ref(false);
        return {
            enabled,
            loading: false,
            id: null,
            submission: false,
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            activity_log: {
                id: null,
                log_name: null,
                subject_type: null,
                is_active: 0,
            },
        };
    },
    computed: {
        fromNowOn() {
            return this.fromNow(this.activity_log.created_at);
        },
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchActivitylog(this.id);
    },
    methods: {
        fetchActivitylog(id) {
            this.$store
                .dispatch("adminActivitylog/fetchActivitylogById", id)
                .then(
                    (response) => {
                        this.activity_log = response.data.data;
                    },
                    (error) => {}
                );
        },
        handleCancel() {
            this.$router.push({ name: "admin.activity_logs" });
        },
    },
};
</script>
