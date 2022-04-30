<template>
    <div class="bg-white">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:py-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-extrabold text-gray-900">
                    All-in-one platform
                </h2>
                <p class="mt-4 text-lg text-gray-500">
                    Our value added services
                </p>
            </div>
            <dl
                class="mt-6 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8"
            >
                <div
                    v-for="feature in features"
                    :key="feature.slug"
                    class="relative"
                >
                    <dt>
                        <CheckIcon
                            class="absolute h-6 w-6 text-green-500"
                            aria-hidden="true"
                        />
                        <p
                            class="ml-9 text-lg leading-6 font-medium text-green-200"
                        >
                            <a
                                href=""
                                class="hover:underline"
                                @click="serviceDetail(feature.slug)"
                            >
                                {{ feature.name }}
                            </a>
                        </p>
                    </dt>
                    <dd
                        class="text-3xl tracking-tight font-extrabold text-gray-200 sm:text-4xl"
                    >
                        <a href="" @click="serviceDetail(feature.slug)">
                            <span
                                v-html="
                                    feature.description &&
                                    feature.description.length
                                        ? feature.description.slice(0, 50) +
                                          ' Read more ...'
                                        : feature.description
                                "
                            ></span>
                        </a>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
</template>

<script>
import { CheckIcon } from "@heroicons/vue/outline";
import axios from "axios";

export default {
    components: {
        CheckIcon,
    },
    data() {
        return {
            features: [],
        };
    },
    created() {
        this.fetchServices();
    },
    methods: {
        fetchServices() {
            this.loading = true;
            axios.get(`/api/v1/service_options`).then((res) => {
                this.features = res.data.data;
                this.loading = false;
            });
        },
        serviceDetail(slug) {
            this.$router.push({
                name: "services.detail",
                params: { slug: slug },
            });
        },
    },
};
</script>
