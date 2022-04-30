<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm>
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Login attempt details
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
                        <!-- user name -->
                        <div class="sm:col-span-6">
                            <label
                                for="username"
                                class="block text-sm font-medium text-gray-700"
                                >Username</label
                            >
                            <div class="mt-1">
                                <input
                                    id="username"
                                    v-model="login_attempt.username"
                                    name="username"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- user agent -->
                        <div class="sm:col-span-6">
                            <label
                                for="user_agent"
                                class="block text-sm font-medium text-gray-700"
                                >User agent</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="user_agent"
                                    v-model="login_attempt.user_agent"
                                    rows="4"
                                    name="user_agent"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- remote ip -->
                        <div class="sm:col-span-6">
                            <label
                                for="remote_id"
                                class="block text-sm font-medium text-gray-700"
                                >Remote IP</label
                            >
                            <div class="mt-1">
                                <input
                                    id="remote_id"
                                    v-model="login_attempt.remote_ip"
                                    name="remote_id"
                                    disabled
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- status -->
                        <div class="sm:col-span-6">
                            <label
                                for="status"
                                class="block text-sm font-medium text-gray-700"
                                >Status</label
                            >
                            <div class="mt-1">
                                <input
                                    id="status"
                                    v-model="login_attempt.status"
                                    name="status"
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
            id: "",
            submission: false,
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",

            login_attempt: {
                id: "",
                username: "",
                user_agent: "",
                remote_id: "",
                status: "",
                description: "",
            },
        };
    },
    computed: {
        fromNowOn() {
            return this.fromNow(this.login_attempt.created_at);
        },
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchLoginAttempt(this.id);
    },
    methods: {
        fetchLoginAttempt(id) {
            this.$store
                .dispatch("adminLoginAttempt/fetchLoginAttemptById", id)
                .then(
                    (response) => {
                        this.login_attempt = response.data.data;
                    },
                    (error) => {}
                );
        },
        handleCancel() {
            this.$router.push({ name: "admin.login_attempts" });
        },
    },
};
</script>
