<template>
    <div
        class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-3"
    >
        <label
            :for="fileName"
            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
            {{ fileName }}
            <span v-if="isRequired" class="text-red-500 font-bold">***</span>
        </label>
        <div class="mt-1 sm:mt-0 sm:col-span-2">
            <div
                v-if="!readOnly"
                class="max-w-lg flex justify-center px-3 pt-3 pb-3 border-2 border-gray-300 border-dashed rounded-md"
            >
                <input
                    :id="fileName"
                    :ref="fileName"
                    type="file"
                    :name="fileName"
                    :accept="accept"
                    class="relative cursor-pointer bg-white rounded-md font-medium text-et-green hover:text-et-green-light focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-et-green-light"
                    @change="onChange($event)"
                />
            </div>
            <div
                v-else
                class="max-w-lg flex justify-center px-3 pt-3 pb-3 text-et-red border-2 border-gray-300 border-dashed rounded-md"
            >
                <p>file not yet attached</p>
            </div>
            <p class="text-xs text-gray-500">
                DOC, PDF, PNG, JPG, GIF up to {{ size }}MB
            </p>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        fileName: {
            type: String,
            default: null,
        },
        accept: {
            type: String,
            default: null,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
        isRequired: {
            type: Number,
            default: 0,
        },
        size: {
            type: Number,
            default: 1,
        },
        clearAttachment: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["update-file"],
    computed: {},
    created() {},
    methods: {
        onChange(event) {
            this.$emit("update-file", event.target.files[0]);
        },
    },
};
</script>
<style scoped></style>
