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
                                        v-for="(status, index) in statuses"
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
                        <!-- priority -->
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
                                        v-for="(priority, index) in priorities"
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
                                for="assigned_id"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Assigned to
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedAssignees"
                                    :options="assignees"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="email"
                                    track-by="id"
                                    @tag="createAssignee"
                                    @search-change="loadAssignees"
                                >
                                </VueMultiselect>
                            </div>
                        </div>
                        <div class="sm:col-span-6">
                            <label
                                for="comment"
                                class="block text-sm font-medium text-gray-700"
                                >Comment</label
                            >
                            <VeeField
                                id="comment"
                                v-model="comment"
                                type="text"
                                name="comment"
                                class="resize shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                @keydown.enter.prevent
                            />
                            <ErrorMessage class="text-red-600" name="comment" />
                        </div>
                        <!-- comment -->
                        <div class="sm:col-span-6">
                            <label
                                for="comment"
                                class="block text-sm font-medium text-gray-700"
                                >Previous Comment</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="comment"
                                    v-model="ticket.comment"
                                    rows="4"
                                    readonly
                                    name="comment"
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
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
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import axios from "axios";
import AuthHeader from "../../../services/admin.auth.header";

export default {
    components: {
        VueMultiselect,
        ErrorAlert,
        SuccessAlert,
    },
    data() {
        return {
            endPoint: "adminTicket",
            loading: false,
            submission: false,
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",
            slug: "",
            route: "",

            assignees: [],
            selectedAssignees: [],
            assigneeTimeout: "",

            comment: "",
            priorities: [],
            statuses: [],

            schema: {
                priority: "required",
                status: "required",
            },

            ticket: {
                tt_number: "",
                status_id: "",
                priority_id: "",
                assignees: [],
                comment: "",
            },
        };
    },
    computed: {},
    created() {
        this.route = this.$route.params.route ?? "admin.tickets";
        this.slug = this.$route.params.slug;
        if (this.slug) {
            this.fetchTicket({ slug: this.slug });
            this.loadStatuses();
            this.loadPriorities();
        }
    },

    methods: {
        fetchTicket(slug) {
            this.loading = true;
            this.$store.dispatch("adminTicket/fetchTicketById", slug).then(
                (response) => {
                    this.loading = false;
                    this.show_alert = true;
                    if (response.data) {
                        this.ticket = response.data.data;
                        this.selectedAssignees = this.ticket.assignees;
                    } else {
                        this.alert_error_message = response.data.message;
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message = error.response.data.message;
                }
            );
        },

        handleCancel() {
            this.$router.push({ name: this.route });
        },

        onEditSubmit(values, actions) {
            let formData = {
                slug: this.ticket.tt_number,
                status_id: this.ticket.status_id,
                assigned_to_user_id: this.selectedAssignees
                    ? this.selectedAssignees.id
                    : "",
                priority_id: this.ticket.priority_id,
                comment: this.comment,
            };

            this.submission = true;
            this.loading = true;

            this.$store.dispatch("adminTicket/assign", formData).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.show_alert = true;
                        this.alert_success_message = response.data.message;
                        actions.resetForm(); // 👈 Reset Form
                        this.reset();
                    } else {
                        this.alert_error_message = response.data.message;
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message = error.response.data.message;
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
            this.statuses = [];
            this.selectedAssignees = [];
            this.priorities = [];
            this.ticket.comment = null;
        },
        //priority
        loadPriorities(search) {
            const params = {
                search: search,
            };
            this.loading = true;
            axios.get(`/api/v1/priority_options`, { params }).then((res) => {
                this.priorities = res.data.data;
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
                this.statuses = res.data.data;
                this.loading = false;
            });
        },
        // assignees
        loadAssignees(search) {
            const params = {
                search: search,
            };
            if (this.assigneeTimeout) {
                clearInterval(this.assigneeTimeout);
            }
            this.loading = true;
            this.assigneeTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/admin/assignee_options`, {
                        params,
                        headers: { Authorization: "Bearer " + AuthHeader() },
                    })
                    .then((res) => {
                        this.assignees = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },

        clearAssignees() {
            this.selectedAssignees = [];
        },

        createAssignee(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios
                .post(`/api/v1/admin/assignee_options`, {
                    params,
                    headers: { Authorization: "Bearer " + AuthHeader() },
                })
                .then((res) => {
                    this.selectedAssignees.push(res.data.data);
                });
        },
    },
};
</script>
