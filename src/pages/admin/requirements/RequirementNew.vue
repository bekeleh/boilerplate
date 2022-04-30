<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Edit Requirement
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-6">
                            <div v-for="(errs, index) in errors" :key="index">
                                <div v-for="(err, indx) in errs" :key="indx">
                                    <ErrorAlert
                                        :alert="err"
                                        @dismiss-notification="
                                            cancelNotification
                                        "
                                    />
                                </div>
                            </div>
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
                        <div class="sm:col-span-4">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="name"
                                    v-model="requirement.name"
                                    type="text"
                                    name="name"
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                <ErrorMessage
                                    class="text-red-600"
                                    name="name"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label
                                for="accept"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Accept
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="accept"
                                    v-model="requirement.accept"
                                    as="select"
                                    name="accept"
                                    autocomplete="accept"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option
                                        value="image/*,application/pdf,application/msword, application/xlsx, application/xls, application/csv, application/docs"
                                    >
                                        image, pdf, msword, msexcel, mscsv
                                    </option>
                                    <option value="application/msword">
                                        msword
                                    </option>
                                    <option value="application/pdf">pdf</option>
                                    <option value="image/*">image</option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="accept"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label
                                for="size"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Type
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="type"
                                    v-model="requirement.type"
                                    as="select"
                                    name="type"
                                    autocomplete="type"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option value="file">file</option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="type"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label
                                for="size"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Size
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="size"
                                    v-model="requirement.size"
                                    as="select"
                                    name="size"
                                    autocomplete="size"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <!-- <option value="3">3</option> -->
                                    <!-- <option value="4">4</option> -->
                                    <!-- <option value="5">5</option> -->
                                    <!-- <option value="10">10</option> -->
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="size"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-4">
                            <label
                                for="unit"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Unit
                            </label>
                            <div class="mt-1">
                                <VeeField
                                    id="unit"
                                    v-model="requirement.unit"
                                    as="select"
                                    name="unit"
                                    autocomplete="unit"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option value="mb">mb</option>
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="unit"
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
                                    v-model="requirement.description"
                                    rows="4"
                                    name="description"
                                    class="resize shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <!-- required -->
                        <div class="sm:col-span-4">
                            <label
                                for="is_active"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Required
                            </label>
                            <Switch
                                v-model="requirement.is_required"
                                :class="[
                                    requirement.is_required
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        requirement.is_required
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>

                        <!-- disable -->
                        <div class="sm:col-span-4">
                            <label
                                for="is_active"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable
                            </label>
                            <Switch
                                v-model="requirement.is_active"
                                :class="[
                                    requirement.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        requirement.is_active
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                        <!-- template -->
                        <div
                            v-if="requirement && requirement.files.length"
                            class="sm:col-span-6"
                        >
                            <div
                                v-for="(file, index) in requirement.files"
                                :key="index"
                                class="sm:col-span-4"
                            >
                                <ViewFile
                                    :file-name="file.file_name"
                                    :name="file.name"
                                    :read-only="false"
                                    :requested-file="file.pivot.requested_file"
                                    @remove-attachment="removeAttachment"
                                />
                            </div>
                        </div>

                        <div v-else class="sm:col-span-6">
                            <FileUpload
                                :file-name="template_file"
                                :read-only="false"
                                :accept="accept"
                                :is-required="0"
                                :size="size"
                                @update-file="handleAttachments"
                            />
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
import { Switch } from "@headlessui/vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import "vue-multiselect/dist/vue-multiselect.css";
import FileUpload from "../../FileUpload.vue";
import ViewFile from "../../FilePreview.vue";

export default {
    components: {
        Switch,
        SuccessAlert,
        ErrorAlert,
        FileUpload,
        ViewFile,
    },

    data() {
        return {
            template_file: "template-file",
            submission: false,
            show_alert: "",
            errors: [],
            alert_variant: "bg-red-500",
            alert_success_message: "",
            alert_error_message: "",
            size: 2,
            accept: "image/*,application/pdf,application/msword, application/xlsx, application/xls, application/csv, application/docs",

            schema: {
                name: "required",
                accept: "required",
                type: "required",
                size: "required",
                unit: "required",
            },

            requirement: {
                id: "",
                name: "",
                accept: "",
                type: "",
                size: "",
                unit: "",
                files: [],
                description: "",
                is_required: false,
                is_active: false,
            },
        };
    },
    methods: {
        handleAttachments() {},
        onEditSubmit(values, actions) {
            let formData = new FormData();
            let file = document.getElementById("template-file")
                ? document.getElementById("template-file").files[0]
                : null;
            formData.append("files", file);
            formData.append("name", this.requirement.name);
            formData.append("accept", this.requirement.accept);
            formData.append("type", this.requirement.type ?? "file");
            formData.append("size", this.requirement.size ?? 1);
            formData.append("unit", this.requirement.unit ?? "mb");
            formData.append("description", this.requirement.description);
            formData.append(
                "is_required",
                this.requirement.is_required ? 1 : 0
            );
            formData.append("is_active", this.requirement.is_active ? 1 : 0);
            // const data = {
            //     name: this.requirement.name,
            //     accept: this.requirement.accept,
            //     type: this.requirement.type ?? "file",
            //     size: this.requirement.size ?? 1,
            //     unit: this.requirement.unit ?? "mb",
            //     description: this.requirement.description,
            //     is_required: this.requirement.is_required,
            //     is_active: this.requirement.is_active,
            // };

            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminRequirement/create", formData).then(
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
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    } else if (error.response.status === 429) {
                        this.alert_error_message =
                            "Too many attempts, Please try again later";
                    } else if (error.response.status === 404) {
                        this.alert_error_message = error.response.statusText;
                    }
                }
            );
        },
        handleDismissNotification() {
            this.alert_success_message = "";
            this.alert_error_message = "";
        },
        reset() {
            this.loading = false;
            this.submission = true;
            this.show_alert = false;
            this.enabled = false;
            this.requirement.size = "";
            this.requirement.type = "";
            this.requirement.unit = "";
            this.requirement.description = "";
            this.requirement.is_required = false;
            this.requirement.is_active = false;
            this.requirement.files = [];
        },
        handleCancel() {
            this.$router.push({ name: "admin.requirements" });
        },
    },
};
</script>
