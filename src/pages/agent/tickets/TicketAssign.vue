<template>
    <div class="min-h-full flex flex-col justify-center py-2 sm:px-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full">
            <p
                class="sm:mx-auto sm:w-full sm:max-w-md mt-2 pt-2 scroll-pb-20 w-full text-xl text-gray-900 text-center font-bold"
            >
                Service Request Assign
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
                        <!-- status -->
                        <div class="sm:col-span-3">
                            <label
                                class="block text-sm font-medium text-gray-700"
                            >
                                Status
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="status"
                                    v-model="ticket.status_id"
                                    as="select"
                                    name="status"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            status, index
                                        ) in ticket.statuses"
                                        :key="index"
                                        :value="status.id"
                                    >
                                        {{ status.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="status"
                                />
                            </div>
                        </div>
                        <!-- status -->
                        <div class="sm:col-span-3">
                            <label
                                class="block text-sm font-medium text-gray-700"
                            >
                                Priority
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="priority"
                                    v-model="ticket.priority_id"
                                    as="select"
                                    name="priority"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            priority, index
                                        ) in ticket.priorities"
                                        :key="index"
                                        :value="priority.id"
                                    >
                                        {{ priority.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="priority"
                                />
                            </div>
                        </div>
                        <!-- assigned to -->
                        <div class="sm:col-span-6">
                            <label
                                class="block text-sm font-medium text-gray-700"
                            >
                                Assigned to
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="assigned_to"
                                    v-model="ticket.assigned_to_user_id"
                                    as="select"
                                    name="assigned_to"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        v-for="(
                                            assigned_to, index
                                        ) in ticket.assignees"
                                        :key="index"
                                        :value="assigned_to.id"
                                    >
                                        {{
                                            assigned_to.first_name +
                                            " " +
                                            assigned_to.middle_name +
                                            " " +
                                            assigned_to.email
                                        }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="assigned_to"
                                />
                            </div>
                        </div>
                        <!-- comment -->
                        <div class="sm:col-span-6">
                            <label
                                for="comment"
                                class="block text-sm font-medium text-gray-700"
                                >Comment</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="comment"
                                    v-model="comment"
                                    rows="4"
                                    name="comment"
                                    class="shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- end of comment -->
                    </div>
                </div>
            </div>
            <!-- submit button -->
            <div class="pt-5 pb-3 mb-8">
                <div class="flex justify-end">
                    <button
                        type="button"
                        class="bg-red py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        @click.prevent="handleCancel"
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
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import axios from "axios";

export default {
    components: {
        ErrorAlert,
        SuccessAlert,
    },
    props: {
        slug: {
            type: String,
            default: null,
        },
    },
    emits: ["cancel:ticket-assign"],
    data() {
        return {
            loading: false,
            submission: false,
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,

            schema: {
                priority: "required",
                assigned_to: "required",
                status: "required",
            },
            comment: null,
            ticket: {
                status_id: null,
                priority_id: null,
                assigned_to_user_id: null,
                priorities: [],
                statuses: [],
                assignees: [],
            },
        };
    },
    computed: {},
    created() {
        if (this.slug) {
            this.fetchTicket({ slug: this.slug });
            this.loadStatuses();
            this.loadAssignees();
            this.loadPriorities();
        }
    },

    methods: {
        fetchTicket(slug) {
            this.loading = true;
            this.$store.dispatch("adminTicket/fetchTicketById", slug).then(
                (response) => {
                    this.loading = false;
                    if (response.data) {
                        this.ticket = response.data.data;
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
            this.$emit("cancel:ticket-assign");
        },
        onEditSubmit(values, actions) {
            let formData = new FormData();

            formData.append("id", this.ticket.id);
            formData.append("priority_id", values.priority);
            formData.append("status_id", values.status);
            formData.append("assigned_to_user_id", values.assigned_to);
            formData.append("comment", this.comment);

            this.submission = true;
            this.loading = true;

            this.$store.dispatch("adminTicket/update", formData).then(
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
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        reset() {
            this.loading = false;
            this.submission = true;
            this.show_alert = false;
            this.ticket.statuses = [];
            this.ticket.assignees = [];
            this.ticket.priorities = [];
            this.ticket.comment = null;
        },

        //assigned to
        loadAssignees(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/user_options`, { params }).then((res) => {
                this.ticket.assignees = res.data.data;
                this.loading = false;
            });
        },
        //priority
        loadPriorities(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/priority_options`, { params }).then((res) => {
                this.ticket.priorities = res.data.data;
                this.loading = false;
            });
        },
        //status
        loadStatuses(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/status_options`, { params }).then((res) => {
                this.ticket.statuses = res.data.data;
                this.loading = false;
            });
        },
    },
};
</script>
