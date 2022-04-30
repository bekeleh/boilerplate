<template>
    <div class="mt-6 p-6">
        <div
            class="flex items-center justify-center mx-auto sm:px-2 sm:pr-3 lg:max-w-6xl lg:mx-auto"
        >
            <div
                class="flex items-center justify-center max-w-lg w-full lg:max-w-xs"
            >
                <label for="date-from" class="pr-3">From:</label>
                <div class="pr-3 text-gray-400 focus-within:text-gray-500">
                    <input
                        id="date_from"
                        v-model="date_from"
                        class="block w-full bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                        placeholder="date from"
                        type="date"
                        name="date_from"
                    />
                </div>
                <label for="date-to" class="pr-3">To:</label>
                <div class="pr-3 text-gray-400 focus-within:text-gray-500">
                    <input
                        id="date_to"
                        v-model="date_to"
                        class="block w-full bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                        placeholder="date to"
                        type="date"
                        name="date_to"
                    />
                </div>
                <div class="pr-3 text-gray-400 focus-within:text-gray-500">
                    <input
                        id="date_to_time"
                        v-model="date_to_time"
                        class="block w-full bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                        placeholder="date to time"
                        type="time"
                        name="date_to_time"
                    />
                </div>
                <div class="pr-2">
                    <input
                        id="search"
                        v-model="search"
                        class="block w-56 bg-white items-center border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                        placeholder="Search"
                        type="text"
                        name="search"
                    />
                </div>
                <div class="pr-3">
                    <button
                        type="button"
                        class="order-0 inline-flex items-center pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                        @click="getDashboard"
                    >
                        <FilterIcon class="h-4 w-4 mr-1" />
                        Search
                    </button>
                </div>
            </div>
        </div>

        <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="item in stats"
                :key="item.name"
                class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
            >
                <dt>
                    <div class="absolute bg-et-green-light rounded-md p-3">
                        <Component
                            :is="icon"
                            class="h-6 w-6 text-white"
                            aria-hidden="true"
                        />
                    </div>
                    <p class="ml-16 text-sm font-medium text-gray-500 truncate">
                        {{ item.name }}
                    </p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p class="text-2xl font-semibold text-gray-900">
                        {{ item.total }}
                    </p>
                    <div
                        class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6"
                    >
                        <div class="text-sm">
                            <a
                                href="#"
                                class="font-medium text-et-green hover:text-et-green-light"
                            >
                                View all<span class="sr-only">
                                    {{ item.name }} stats</span
                                ></a
                            >
                        </div>
                    </div>
                </dd>
            </div>
        </dl>
    </div>
</template>

<script>
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/vue/solid";
import { TicketIcon, FilterIcon, SearchIcon } from "@heroicons/vue/outline";
import { ref } from "vue";
import { useStore } from "vuex";

import { onMounted } from "vue";
export default {
    components: {
        ArrowSmDownIcon,
        ArrowSmUpIcon,
        TicketIcon,
        FilterIcon,
        SearchIcon,
    },
    setup() {
        const store = useStore();
        const stats = ref({});
        const icon = ref(TicketIcon);
        const totalTicket = ref(0);
        const search = ref("");
        const date_from = ref("");
        const date_to = ref("");
        const date_to_time = ref("");

        onMounted(getDashboard);
        function getDashboard() {
            let query = {
                search: search.value,
                dateFrom: date_from.value,
                dateTo: date_to.value,
                dateToTime: date_to_time.value,
            };
            store
                .dispatch("adminDashboard/fetchDashboard", query)
                .then((response) => {
                    stats.value = response.data.data;
                });
        }

        return {
            stats,
            icon,
            search,
            totalTicket,
            getDashboard,
            date_from,
            date_to,
            date_to_time,
        };
    },
};
</script>
