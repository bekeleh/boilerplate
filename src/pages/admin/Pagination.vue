<template>
    <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
        <div class="flex-1 flex justify-between sm:hidden">
            <a
                href="#"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                @click="
                    pagination.prev_page_url
                        ? onChange(pagination.prev_page_url)
                        : pagination.prev_page_url
                "
            >
                Previous
            </a>
            <a
                href="#"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                @click="
                    pagination.next_page_url
                        ? onChange(pagination.next_page_url)
                        : pagination.next_page_url
                "
            >
                Next
            </a>
        </div>
        <div
            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
            <div>
                <p class="text-sm text-gray-700">
                    Showing
                    {{ " " }}
                    <span class="font-medium">{{
                        pagination.current_page
                    }}</span>
                    {{ " " }}
                    to
                    {{ " " }}
                    <span class="font-medium">{{ pagination.per_page }}</span>
                    {{ " " }}
                    of
                    {{ " " }}
                    <span class="font-medium">{{ pagination.total }}</span>
                    {{ " " }}
                    results
                </p>
            </div>
            <div>
                <nav
                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <div v-for="(link, index) in pagination.links" :key="index">
                        <a
                            aria-current="page"
                            :class="
                                link.active
                                    ? 'z-10 bg-indigo-50 border-et-green-light text-et-green'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50' &&
                                      link.url
                                    ? 'cursor-pointer'
                                    : null
                            "
                            class="bg-white hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                            @click="link.url ? onChange(link.url) : link.url"
                        >
                            <span v-html="link.label"></span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, reactive, toRefs } from "vue";

const props = defineProps({
    pagination: {
        type: Object,
        default: null,
    },
});

const { pagination } = toRefs(props);

const state = reactive({
    room: {},
});

const init = async () => {
    // const { data } = await getRoomByNo(no.value);
};

init();
</script>

<style lang="scss" scoped></style>
