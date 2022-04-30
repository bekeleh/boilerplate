<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm>
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Requirement Details
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-4">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="name"
                                    v-model="requirement.name"
                                    type="text"
                                    name="name"
                                    readonly
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
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
                                <select
                                    id="accept"
                                    v-model="requirement.accept"
                                    as="select"
                                    disabled
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
                                </select>
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
                                <select
                                    id="type"
                                    v-model="requirement.type"
                                    as="select"
                                    disabled
                                    name="type"
                                    autocomplete="type"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                >
                                    <option value="">Please select</option>
                                    <option value="file">file</option>
                                </select>
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
                                    <!-- <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option> -->
                                </VeeField>
                                <ErrorMessage
                                    class="text-red-600"
                                    name="size"
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
                                    readonly
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
                                :disabled="true"
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
                                :disabled="true"
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
                                    :read-only="true"
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
                        back
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import { Switch } from "@headlessui/vue";
import "vue-multiselect/dist/vue-multiselect.css";
import FileUpload from "../../FileUpload.vue";
import ViewFile from "../../FilePreview.vue";

export default {
    components: {
        Switch,
        FileUpload,
        ViewFile,
    },
    emits: ["cancel:requirement-view"],
    data() {
        return {
            template_file: "template-file",
            loading: false,
            id: "",
            size: 2,
            accept: "image/*,application/pdf,application/msword, application/xlsx, application/xls, application/csv, application/docs",
            schema: {
                name: "required",
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
                is_active: false,
                is_required: false,
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchRequirement(this.id);
    },
    methods: {
        removeAttachment() {},
        handleAttachments() {},
        fetchRequirement(id) {
            this.$store
                .dispatch("adminRequirement/fetchRequirementById", id)
                .then(
                    (response) => {
                        this.requirement = response.data.data;
                        this.requirement.is_required = this.requirement
                            .is_required
                            ? true
                            : false;
                        this.requirement.is_active = this.requirement.is_active
                            ? true
                            : false;
                    },
                    (error) => {}
                );
        },
        handleCancel() {
            this.$router.push({ name: "admin.requirements" });
        },
    },
};
</script>
