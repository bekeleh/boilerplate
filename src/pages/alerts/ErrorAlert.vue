<template>
    <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
            <div class="flex-shrink-0">
                <ExclamationIcon
                    class="h-5 w-5 text-red-400"
                    aria-hidden="true"
                />
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium text-red-800">
                    {{ alert }}
                </p>
            </div>
            <div class="ml-auto pl-3">
                <div class="-mx-1.5 -my-1.5">
                    <button
                        type="button"
                        class="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                        @click="handleDismiss"
                    >
                        <span class="sr-only">Dismiss</span>
                        <XIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/solid";
import { XIcon } from "@heroicons/vue/solid";

export default {
    components: {
        ExclamationIcon,
        XIcon,
    },
    props: {
        alert: {
            type: String,
            default: null,
        },
    },
    emits: ["dismiss-notification"],
    methods: {
        handleDismiss() {
            this.$emit("dismiss-notification");
        },
    },
};
</script>
