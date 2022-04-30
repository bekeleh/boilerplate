<template>
    <div class="px-6 py-5 mt-2 mb-8 flex flex-col">
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
        <div>
            <div class="flex flex-1 m-3 mx-auto items-center justify-end">
                <button
                    type="button"
                    class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    @click.prevent="backToClientTicket"
                >
                    Back
                </button>
            </div>
            <ul
                v-for="(commentItem, commentItemIdx) in comments"
                :key="commentItemIdx"
                role="list"
            >
                <li>
                    <div class="relative pb-8">
                        <span
                            v-if="commentItemIdx !== comment.length - 1"
                            class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                        />
                        <div class="relative flex items-start space-x-3">
                            <template
                                v-if="
                                    commentItem.notifiable_type ==
                                    'App\\Models\\Client'
                                "
                            >
                                <div class="relative">
                                    <div
                                        class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                                    >
                                        <UserCircleIcon
                                            class="text-gray-500"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <span
                                        class="absolute -bottom-0.5 -right-1 bg-white rounded-tl px-0.5 py-px"
                                    >
                                        <ChatAltIcon
                                            class="h-4 w-4 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div>
                                        <div class="text-sm">
                                            <a
                                                href="#"
                                                class="font-medium text-gray-500"
                                            >
                                                {{ commentItem.data.name }}
                                                (Ethio telecom)
                                            </a>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-500">
                                            Sent at
                                            {{
                                                fromNow(commentItem.created_at)
                                            }}
                                        </p>
                                    </div>
                                    <!-- has attachment -->

                                    <div class="mt-2 text-sm text-gray-700">
                                        <p>
                                            {{ commentItem.data.message }}
                                        </p>
                                        <div
                                            v-if="
                                                commentItem.data.hasAttachment
                                            "
                                        >
                                            <div
                                                v-for="(file, index) in files"
                                                :key="index"
                                            >
                                                <div
                                                    v-if="
                                                        commentItem.notifiable_type ==
                                                            'App\\Models\\Client' &&
                                                        file.name ==
                                                            commentItem.data
                                                                .attachmentId
                                                    "
                                                >
                                                    <FileDownload
                                                        :file-name="
                                                            file.file_name
                                                        "
                                                        :name="file.name"
                                                        :requested-file="
                                                            file.pivot
                                                                .requested_file
                                                        "
                                                        :path="file.path"
                                                        :read-only="false"
                                                        :end-point="endPoint"
                                                        @download-attachment="
                                                            downloadAttachment
                                                        "
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p class="mt-0.5 text-sm text-gray-600">
                                            Read at
                                            {{ fromNow(commentItem.read_at) }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-if="!comments.length">
                <h1>No notifications available</h1>
            </div>
        </div>
        <!-- <VeeForm
            :validation-schema="schema"
            class="px-3 pt-6"
            @submit="onSubmit"
        > -->
        <!-- comment public -->

        <!-- <div class="px-2">
                <label for="comment" class="text-sm font-medium text-gray-700"
                    >Add a public message</label
                >
                <div class="mt-1">
                    <VeeField
                        id="comment"
                        v-model="comment"
                        as="textarea"
                        rows="4"
                        name="comment"
                        class="resize shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                    <ErrorMessage class="text-red-600" name="comment" />
                </div>
            </div> -->
        <!-- submit button -->
        <!-- <div class="px-6 pt-2 pb-8">
                <button
                    type="button"
                    class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-et-red hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-900"
                    @click.prevent="backToAdminTicket"
                >
                    Back
                </button>
                <button
                    :disabled="submission"
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green hover:bg-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-b"
                >
                    Submit
                </button>
            </div> -->
        <!-- </VeeForm> -->

        <div class="m-3 px-6 pt-2 pb-8">
            <button
                type="button"
                class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                @click.prevent="backToClientTicket"
            >
                Back
            </button>
        </div>
    </div>
</template>

<script>
import FileDownload from "../../FileDownload.vue";
import { ChatAltIcon, UserCircleIcon } from "@heroicons/vue/solid";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";

export default {
    components: {
        FileDownload,
        ChatAltIcon,
        UserCircleIcon,
        ErrorAlert,
        SuccessAlert,
    },
    data() {
        return {
            endPoint: "clientTicket",
            enabled: false,
            submission: false,
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",
            comment: "",
            prevPage: "",
            comments: [],
            files: [],

            schema: {
                comment: "required",
            },
        };
    },
    created() {
        this.prevPage = this.$route.params.prevPage;
        this.fetchRevenue();
    },
    methods: {
        fetchRevenue() {
            let params = {
                id: this.$route.params.id,
            };
            this.$store.dispatch("clientRevenue/fetchRevenueById", params).then(
                (response) => {
                    this.comments = response.data.data;
                    this.files = response.data.files;
                },
                (error) => {
                    // this.alert_error_message =
                    //     "Whoops, looks like something went wrong";
                }
            );
        },
        downloadAttachment(name) {
            this.$store.dispatch("clientTicket/downloadAttachment", name).then(
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
        // onSubmit(values, actions) {
        //     let formData = {
        //         clientId: this.$route.params.clientId,
        //         comment: this.comment,
        //     };
        //     this.$store.dispatch("clientRevenue/create", formData).then(
        //         (response) => {
        //             if (response.data && response.data.success) {
        //                 this.show_alert = true;
        //                 this.alert_success_message = response.data.message;
        //                 actions.resetForm(); // 👈 Reset Form
        //                 this.reset();
        //                 this.fetchRevenue();
        //             } else {
        //                 this.alert_error_message =
        //                     "Whoops, looks like something went wrong";
        //             }
        //         },
        //         (error) => {
        //             this.loading = false;
        //             this.show_alert = true;
        //             this.alert_error_message =
        //                 "Whoops, looks like something went wrong";
        //         }
        //     );
        // },
        reset() {
            this.comment = "";
            this.comments = [];
        },
        backToClientTicket() {
            this.$router.push({ name: "client.tickets" });
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
    },
};
</script>
