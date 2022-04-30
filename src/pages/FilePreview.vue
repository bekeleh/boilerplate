<template>
    <div class="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt class="text-sm font-medium text-gray-500">{{ requestedFile }}</dt>
        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            <ul
                role="list"
                class="border border-gray-200 rounded-md divide-y divide-gray-200"
            >
                <li
                    class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                    <div class="w-0 flex-1 flex items-center">
                        <PaperClipIcon
                            class="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        <span class="ml-2 flex-1 w-0 truncate">
                            {{ fileName }}
                        </span>
                    </div>
                    <div class="ml-4 flex-shrink-0">
                        <a
                            v-if="!readOnly"
                            href="#"
                            class="font-medium text-et-red hover:text-et-red"
                            @click.prevent="removeAttachment"
                        >
                            Remove
                        </a>
                    </div>
                </li>
            </ul>
        </dd>
    </div>
</template>

<script>
import { PaperClipIcon } from "@heroicons/vue/solid";

export default {
    components: {
        PaperClipIcon,
    },
    props: {
        requestedFile: {
            type: String,
            default: null,
        },
        fileName: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["remove-attachment"],
    methods: {
        removeAttachment() {
            this.$emit("remove-attachment", this.name);
        },
    },
};
</script>
