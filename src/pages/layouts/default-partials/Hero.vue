<template>
    <div class="md:relative bg-et-green-light">
        <main class="lg:relative">
            <div
                class="mx-auto max-w-7xl w-full pt-8 pb-20 text-center lg:py-16 lg:text-left"
            >
                <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                    <h1
                        class="text-2xl tracking-tight font-bold text-gray-700 sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl"
                    >
                        <!-- partners management portal -->
                        <span class="block xl:inline">
                            Welcome to Ethio telecom online VAS partners
                            management portal
                        </span>
                        {{ " " }}
                    </h1>

                    <h2
                        class="lg:mt-8 text-2xl mt-3 tracking-tight font-bold text-gray-600 sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl"
                    >
                        <span class="block text-white xl:inline"
                            >We're striving to enrich your online business</span
                        >
                    </h2>
                </div>
            </div>
            <div
                class="relative w-full lg:absolute lg:inset-y-0 lg:right-0 sm:right-1 lg:w-1/2 lg:h-full h-96"
            >
                <img
                    class="absolute inset-0 w-full h-full object-fill"
                    :src="heroImage"
                    alt=""
                />
            </div>
        </main>
    </div>
    <div class="md:relative bg-white">
        <div class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-16">
            <div
                class="flex-1 mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none"
            >
                <div
                    v-for="feature in features"
                    :key="feature.title"
                    class="flex flex-col overflow-hidden"
                >
                    <div class="flex-shrink-0">
                        <img
                            v-if="feature.imageUrl"
                            class="h-36 w-full object-fill"
                            :src="feature.imageUrl"
                            alt=""
                        />
                    </div>
                    <div class="flex flex-1 px-6 py-3 flex-col justify-between">
                        <div class="flex-1 text font-bold text-et-green-light">
                            <a href="#" @click="serviceDetail(feature.slug)">
                                {{ feature.name }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            heroImage: "/img/services.svg",
            a2p: "/img/a2p.svg",
            api: "/img/api.svg",
            collocation: "/img/collocation.svg",
            corporate_crbt: "/img/corporate_crbt.svg",
            crbt: "/img/crbt.svg",
            device_insturance: "/img/device_insurance.svg",
            m2m: "/img/m2m.svg",
            mo: "/img/mo.svg",
            mt: "/img/mt.svg",
            obd: "/img/obd.svg",
            payment_api: "/img/payment_api.svg",
            sms_np: "/img/sms_np.svg",
            sms_premium: "/img/sms_premium.svg",
            ussd_np: "/img/ussd_np.svg",
            ussd_premium: "/img/ussd_premium.svg",
            visp: "/img/visp.svg",
            voice_np: "/img/voice_np.svg",
            voice_premium: "/img/voice_premium.svg",
            features: [],
        };
    },
    created() {
        this.fetchServices();
    },
    methods: {
        loadFAQ() {
            this.$router.push({ name: "client.faqs" });
        },
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
