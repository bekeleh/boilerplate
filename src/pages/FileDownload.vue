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
                            class="flex-shrink-0 h-5 w-5 text-et-green"
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
                            class="font-medium text-et-green-light hover:text-et-green"
                            @click.prevent="downloadAttachment"
                        >
                            Download
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
        path: {
            type: String,
            default: null,
        },
        endPoint: {
            type: String,
            default: null,
        },
        readOnly: {
            type: Boolean,
            default: false,
        },
    },
    created() {},

    methods: {
        downloadAttachment() {
            this.$store
                .dispatch(this.endPoint + "/downloadAttachment", this.name)
                .then(
                    (response) => {
                        let fileURL = window.URL.createObjectURL(
                            new Blob([response.data])
                        );
                        let fileLink = document.createElement("a");

                        fileLink.href = fileURL;
                        fileLink.setAttribute("download", this.fileName);
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    },
                    (error) => {}
                );
        },
    },
};
</script>
