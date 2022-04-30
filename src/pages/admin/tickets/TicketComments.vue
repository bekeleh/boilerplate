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
            <ul
                v-for="(comment, commentItemIdx) in comments"
                :key="comment.id"
                role="list"
            >
                <li
                    v-for="(commentItem, commentIdx) in comment.resources"
                    :key="commentIdx"
                >
                    <div class="relative pb-8">
                        <span
                            v-if="commentItemIdx !== comment.length - 1"
                            class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                        />
                        <div class="relative flex items-start space-x-3">
                            <template
                                v-if="
                                    commentItem.pivot.commentable_type ==
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
                                                >{{
                                                    commentItem.name
                                                }}
                                                (Customer)</a
                                            >
                                        </div>
                                    </div>
                                    <div class="mt-2 text-sm text-gray-700">
                                        <p>
                                            {{ comment.comment }}
                                        </p>
                                        <p class="mt-0.5 text-sm text-gray-500">
                                            Commented
                                            <!-- {{ fromNow(comment.created_at) }} -->
                                            {{ comment.created_at }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                            <template
                                v-else-if="
                                    commentItem.pivot.commentable_type ==
                                    'App\\Models\\User'
                                "
                            >
                                <div>
                                    <div class="relative px-1">
                                        <div
                                            class="h-8 w-8 bg-gray-100 rounded-full ring-8 ring-white flex items-center justify-center"
                                        >
                                            <UserCircleIcon
                                                class="h-5 w-5 text-gray-500"
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
                                </div>
                                <div class="min-w-0 flex-1 py-1.5">
                                    <div class="text-sm text-gray-500">
                                        <a
                                            href="#"
                                            class="font-medium text-gray-500"
                                            >{{ commentItem.name }} (Ethio
                                            telecom agent)</a
                                        >
                                    </div>

                                    <div class="mt-2 text-sm text-gray-700">
                                        <p>
                                            {{ comment.comment }}
                                        </p>
                                        <p class="mt-0.5 text-sm text-gray-500">
                                            Commented
                                            <!-- {{ fromNow(comment.created_at) }} -->
                                            {{ comment.created_at }}
                                        </p>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <VeeForm
            :validation-schema="schema"
            class="px-3 pt-6"
            @submit="onSubmit"
        >
            <!-- comment public -->
            <div>
                <label
                    for="enabled"
                    class="block text-sm font-medium text-gray-700"
                >
                    Visible to client
                </label>
                <Switch
                    v-model="enabled"
                    :class="[
                        enabled ? 'bg-et-green' : 'bg-gray-200',
                        'relative inline-flex flex-shrink-0 h-6 w-11 border-2 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-border-et-green-light border-et-green-light focus:ring-offset-2 focus:ring-bg-et-green',
                    ]"
                >
                    <span
                        aria-hidden="true"
                        :class="[
                            enabled ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                        ]"
                    />
                </Switch>
            </div>
            <div class="px-2">
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
            </div>
            <!-- submit button -->
            <div class="px-6 pt-2 pb-8">
                <button
                    type="button"
                    class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    @click.prevent="backToAdminTicket"
                >
                    Back
                </button>
                <button
                    :disabled="submission"
                    type="submit"
                    class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-b"
                >
                    Submit
                </button>
            </div>
        </VeeForm>
    </div>
</template>

<script>
import { Switch } from "@headlessui/vue";
import { ChatAltIcon, UserCircleIcon } from "@heroicons/vue/solid";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";

export default {
    components: {
        Switch,
        ChatAltIcon,
        UserCircleIcon,
        ErrorAlert,
        SuccessAlert,
    },
    data() {
        return {
            enabled: false,
            submission: false,
            show_alert: "",
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",
            comment: "",
            prevPage: "",
            comments: [],

            schema: {
                comment: "required",
            },
        };
    },
    created() {
        this.prevPage = this.$route.params.prevPage;
        this.fetchComment();
    },
    methods: {
        fetchComment() {
            let params = {
                id: this.$route.params.id,
                slug: this.$route.params.slug,
            };
            this.$store.dispatch("adminComment/fetchCommentById", params).then(
                (response) => {
                    this.comments = response.data.data;
                },
                (error) => {
                    // this.alert_error_message =
                    //     "Whoops, looks like something went wrong";
                }
            );
        },

        onSubmit(values, actions) {
            let formData = {
                slug: this.$route.params.slug,
                comment: this.comment,
                is_public: this.enabled,
            };
            this.$store.dispatch("adminComment/create", formData).then(
                (response) => {
                    if (response.data && response.data.success) {
                        this.show_alert = true;
                        this.alert_success_message = response.data.message;
                        this.fetchComment();
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
        reset() {
            this.enabled = false;
            this.comment = null;
        },
        backToAdminTicket() {
            this.$router.push({ name: this.prevPage });
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
    },
};
</script>
