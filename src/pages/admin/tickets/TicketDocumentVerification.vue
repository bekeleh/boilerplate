<template>
    <div class="min-h-full flex flex-col justify-center py-2 sm:px-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full">
            <p
                class="sm:mx-auto sm:w-full sm:max-w-md mt-2 pt-2 scroll-pb-20 w-full text-xl text-gray-900 text-center font-bold"
            >
                Service Request Documents Verification
            </p>
        </div>
        <!-- :validation-schema="schema" -->
        <VeeForm
            class="mt-2 mb-8 flex flex-col justify-center items-center"
            @submit="onSubmit"
        >
            <div class="flex space-y-8 divide-y divide-gray-200">
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
                        <!-- attachments -->
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

                        <!-- priority -->
                        <div class="sm:col-span-3">
                            <label
                                class="block text-sm font-medium text-gray-700"
                            >
                                Priority
                            </label>
                            <div class="mt-1">
                                <select
                                    id="priority"
                                    v-model="ticket.priority_id"
                                    name="priority"
                                    disabled
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
                                </select>
                            </div>
                        </div>

                        <!-- document status -->
                        <!-- v-if="ticket.approval_status !== 1" -->
                        <div class="sm:col-span-3">
                            <label
                                for="document_status"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Documents Status
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="document_status"
                                    v-model="ticket.document_status"
                                    :rules="doc_validate"
                                    as="select"
                                    name="document_status"
                                    :disabled="!doc_validate"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="" selected>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(
                                            document_status, index
                                        ) in document_statuses"
                                        :key="index"
                                        :value="document_status.id"
                                    >
                                        {{ document_status.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="document_status"
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
                                    name="status"
                                    as="select"
                                    :disabled="isDisabled"
                                    :rules="status_validate"
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
                        <div class="sm:col-span-6">
                            <VeeField
                                id="comment"
                                v-model="comment"
                                type="text"
                                name="comment"
                                :rules="comment_validate"
                                class="resize shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                @keydown.enter.prevent
                            />
                            <ErrorMessage class="text-red-600" name="comment" />
                        </div>
                        <!-- description -->
                        <div class="sm:col-span-6">
                            <label
                                for="comment"
                                class="block text-sm font-medium text-gray-700"
                                >Previous Comment</label
                            >
                            <textarea
                                id="comment"
                                v-model="ticket.comment"
                                rows="4"
                                name="comment"
                                disabled
                                class="resize shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <!-- disable -->
                        <div class="sm:col-span-6">
                            <label
                                for="is_active"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Notify to client
                            </label>
                            <Switch
                                v-model="notify"
                                :class="[
                                    notify
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        notify
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
            <!-- submit button -->
            <div class="pt-5 pb-3">
                <div class="flex justify-end">
                    <button
                        type="button"
                        class="bg-red py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        @click.prevent="handleTicketAssigned"
                    >
                        Back
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
import FileDownload from "../../FileDownload.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import { Switch } from "@headlessui/vue";
export default {
    components: {
        Switch,
        FileDownload,
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        return {
            notify: false,
            loading: false,
            submission: false,
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,
            endPoint: "adminTicket",
            slug: null,
            statuses: [],
            priorities: [],

            document_statuses: [
                { id: 1, name: "All document's are satisfied" },
                { id: 2, name: "Some document's are missed" },
            ],

            // schema: {
            //     status: "required",
            //     document_status: "required",
            //     comment: "required",
            // },

            comment: "",

            ticket: {
                status_id: null,
                priority_id: null,
                document_status: null,
                priority: null,
                comment: null,
            },
        };
    },
    computed: {
        status_validate() {
            return this.isNullOrEmpty(this.ticket.status_id) ? "required" : "";
        },
        doc_validate() {
            return this.isNullOrEmpty(this.ticket.document_status) ||
                this.ticket.document_status == "2"
                ? "required"
                : "";
        },
        comment_validate() {
            return this.notify || this.ticket.document_status == "2"
                ? "required"
                : "";
        },

        isDisabled() {
            return this.ticket.document_status == "2" ? true : false;
        },
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
            this.fetchTicket({ slug: this.slug });
            this.loadStatuses();
            this.loadPriorities();
        }
        this.$store.commit("adminTicket/ticketRequirements", []);
        this.$store.commit("adminTicket/ticketFiles", []);
    },

    methods: {
        fetchTicket(slug) {
            this.loading = true;
            this.$store.dispatch("agentTicket/fetchTicketById", slug).then(
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
        onSubmit(values, actions) {
            let formData = {
                notify: this.notify,
                slug: this.slug,
                priority_id: this.ticket.priority_id,
                status_id: this.ticket.status_id,
                document_status: this.ticket.document_status,
                comment: this.comment,
            };

            this.submission = true;
            this.loading = true;
            this.$store
                .dispatch("agentTicket/documentVerification", formData)
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data.success) {
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
        reset() {
            this.notify = false;
            this.ticket.comment = null;
            this.ticket.priority_id = null;
            this.ticket.status_id = null;
            this.ticket.document_status = null;
            this.priorities = [];
            this.statuses = [];
            this.document_statuses = [];
            this.$store.commit("adminTicket/ticketRequirements", []);
            this.$store.commit("adminTicket/ticketFiles", []);
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        handleTicketAssigned() {
            this.$router.push({ name: "admin.tickets.my" });
        },
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
    },
};
</script>
