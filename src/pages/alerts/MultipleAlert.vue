<template>
    <div class="rounded-md bg-yellow-50 p-4 border-yellow-400">
        <div class="flex">
            <div class="flex-shrink-0">
                <ExclamationIcon
                    class="h-5 w-5 text-yellow-400"
                    aria-hidden="true"
                />
            </div>
            <div class="ml-3">
                <h3 class="text-sm font-medium text-yellow-800">
                    This service request requires:-
                </h3>
                <div class="mt-2 text-sm text-yellow-700">
                    <ul
                        v-for="(alert, index) in alerts"
                        :key="index"
                        role="list"
                        class="list-disc pl-5 space-y-1"
                    >
                        <li>{{ alert.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ExclamationIcon } from "@heroicons/vue/solid";

export default {
    components: {
        ExclamationIcon,
    },
    props: {
        alerts: {
            type: Array,
            default: null,
        },
    },
};
</script>
