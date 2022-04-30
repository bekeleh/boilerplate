<template>
    <div class="min-h-full flex flex-col justify-center py-2 sm:px-6 lg:px-6">
        <div class="sm:mx-auto sm:w-full">
            <p
                class="sm:mx-auto sm:w-full sm:max-w-md mt-2 pt-2 scroll-pb-20 w-full text-xl text-gray-900 text-center font-bold"
            >
                Service Request Approval
            </p>
        </div>
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

                        <!-- document status -->
                        <div class="sm:col-span-6">
                            <label
                                for="document_status"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Document Status
                            </label>
                            <div class="mt-1">
                                <select
                                    id="document_status"
                                    v-model="ticket.document_status"
                                    name="document_status"
                                    disabled
                                    :class="[
                                        ticket.document_status == 2
                                            ? 'text-et-red text-xl font-bold'
                                            : 'text-et-green text-xl font-bold',
                                        'shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md',
                                    ]"
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
                                </select>
                            </div>
                        </div>
                        <!-- approve status -->
                        <div class="sm:col-span-6">
                            <label
                                for="approval_status"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Approval Status
                            </label>

                            <div
                                v-if="ticket.document_status == 1"
                                class="mt-1"
                            >
                                <VeeField
                                    id="approval_status"
                                    v-model="approval_status"
                                    as="select"
                                    :rules="approval_status_validate"
                                    name="approval_status"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="" selected>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(
                                            app_stat, index
                                        ) in documents_passed"
                                        :key="index"
                                        :value="app_stat.id"
                                    >
                                        {{ app_stat.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="approval_status"
                                />
                            </div>

                            <div
                                v-if="ticket.document_status == 2"
                                class="mt-1"
                            >
                                <VeeField
                                    id="approval_status"
                                    v-model="approval_status"
                                    as="select"
                                    :rules="approval_status_validate"
                                    name="approval_status"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                >
                                    <option value="" selected>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(
                                            app_stat, index
                                        ) in documents_failed"
                                        :key="index"
                                        :value="app_stat.id"
                                    >
                                        {{ app_stat.name }}
                                    </option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="approval_status"
                                />
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
                                :rules="
                                    ticket.document_status == 1
                                        ? doc_passed_approval_validate
                                        : doc_failed_approval_validate
                                "
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
                            <div class="mt-1">
                                <textarea
                                    id="comment"
                                    v-model="ticket.comment"
                                    disabled
                                    rows="4"
                                    name="comment"
                                    readonly
                                    class="resize shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                        <!-- notification -->
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
                        @click.prevent="handleTicketApproval"
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

            document_statuses: [
                { id: 1, name: "All documents are satisfied" },
                { id: 2, name: "Some documents are missed" },
            ],
            approval_status: "",

            // approval_statuses: [
            //     { id: 1, name: "Approve document" },
            //     { id: 2, name: "Accept with missed document" },
            // ],

            documents_passed: [
                { id: 1, name: "Accept with full documents" },
                { id: 2, name: "Reject" },
            ],

            documents_failed: [
                { id: 1, name: "Reject" },
                { id: 2, name: "Accept with missed documents" },
            ],

            comment: "",

            // schema: {
            //     approval_status: "required",
            //     comment: "required",
            // },

            ticket: {
                approval_status: null,
                document_status: null,
            },
        };
    },
    computed: {
        approval_status_validate() {
            return this.isNullOrEmpty(this.approval_status) ? "required" : "";
        },

        doc_passed_approval_validate() {
            return this.approval_status == "2" ? "required" : "";
        },

        doc_failed_approval_validate() {
            return this.approval_status == "1" ? "required" : "";
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

        this.fetchTicket();

        this.$store.commit("adminTicket/ticketRequirements", []);
        this.$store.commit("adminTicket/ticketFiles", []);
    },

    methods: {
        Filter() {
            this.fetchTicket();
        },
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
                approval_status: this.approval_status,
                comment: this.comment,
            };

            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminTicket/approve", formData).then(
                (response) => {
                    this.loading = false;
                    if (response.data.success) {
                        this.show_alert = true;
                        this.alert_success_message = response.data.message;
                        actions.resetForm(); // 👈 Reset Form
                        this.reset();
                    } else {
                        if (!response.data.success) {
                            this.alert_error_message = response.data.message;
                        }
                        // this.alert_error_message =
                        //     "Whoops, looks like something went wrong";
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
            this.ticket.approval_status = null;
            this.ticket.document_status = null;
            this.ticket.comment = null;
            this.$store.commit("adminTicket/ticketRequirements", []);
            this.$store.commit("adminTicket/ticketFiles", []);
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        handleTicketApproval() {
            this.$router.push({
                name: "admin.tickets.approve",
                params: { route: "admin.tickets.approve" },
            });
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
        loadStatuses(search) {
            const params = {
                search: search,
            };
            if (this.statusTimeout) {
                clearInterval(this.statusTimeout);
            }
            this.loading = true;
            this.statusTimeout = setTimeout(() => {
                axios.get(`/api/v1/status_options`, { params }).then((res) => {
                    this.statuses = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
    },
};
</script>
