<template>
    <div class="bg-white">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto divide-y-2 divide-gray-200">
                <h2
                    class="text-center text font-extrabold text-gray-700 sm:text-2xl"
                >
                    Frequently asked questions
                </h2>
                <dl class="mt-6 space-y-6 divide-y divide-gray-200">
                    <Disclosure
                        v-for="faq in faqs"
                        :key="faq.question"
                        v-slot="{ open }"
                        as="div"
                        class="pt-6"
                    >
                        <dt class="text-lg">
                            <DisclosureButton
                                class="text-left w-full flex justify-between items-start text-900-700"
                            >
                                <span class="font-medium text-gray-600">
                                    {{ faq.question }}
                                </span>
                                <span class="ml-6 h-7 flex items-center">
                                    <ChevronDownIcon
                                        :class="[
                                            open ? '-rotate-180' : 'rotate-0',
                                            'h-6 w-6 transform',
                                        ]"
                                        aria-hidden="true"
                                    />
                                </span>
                            </DisclosureButton>
                        </dt>
                        <DisclosurePanel as="dd" class="mt-2 pr-12">
                            <p class="text-base text-gray-600">
                                {{ faq.answer }}
                            </p>
                        </DisclosurePanel>
                    </Disclosure>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/outline";

// const faqs = [
//     {
//         question: "What's the best thing about Switzerland?",
//         answer: "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
//     },
//     // More questions...
// ];

export default {
    components: {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        ChevronDownIcon,
    },
    data() {
        return {
            loading: false,
            faqs: [],
            pagination: {
                page: 1,
                first_page_url: "",
                next_page_url: "",
                last_page_url: "",
                prev_page_url: "",
                last_page: "",
                from: "",
                to: "",
                total: "",
                path: "",
                per_page: 10,
                links: {},
                current_page: 1,
            },
        };
    },
    created() {
        this.fetchFaq();
    },
    methods: {
        fetchFaq(page) {
            if (typeof page == "undefined") {
                page = 1;
            }
            this.loading = true;
            this.$store
                .dispatch("adminFaq/fetchFaqSection", {
                    page: page,
                    per_page: 10,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data) {
                            this.faqs = response.data.data;
                            this.pagination.links = response.data.links;
                            this.pagination.current_page =
                                response.data.current_page;
                            this.pagination.total = response.data.total;
                            this.pagination.from = response.data.from;
                            this.pagination.to = response.data.to;
                            this.pagination.per_page = response.data.per_page;
                        } else {
                            this.loading = false;
                            this.show_alert = true;
                            this.alert_message =
                                "Whoops, looks like something went wrong";
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.show_alert = true;
                        this.alert_error_message = error.response.data.message;
                    }
                );
        },
    },
};
</script>
