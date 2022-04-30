<template>
    <div class="md:relative py-8 bg-white overflow-hidden">
        <div class="md:relative px-4 sm:px-6 lg:px-6">
            <div class="text-lg max-w-prose mx-auto">
                <h1>
                    <span
                        class="block text-2xl text-center leading-8 font-extrabold tracking-tight text-gray-700 sm:text-xl"
                    >
                        Service details for {{ service.name }}
                    </span>
                </h1>
            </div>
            <div
                class="mt-3 prose prose-indigo prose-lg text-gray-600 text mx-auto"
            >
                <span v-html="service.description"></span>
            </div>
            <div class="mt-2 max-w-md sm:flex sm:justify-center md:mt-8">
                <div class="rounded-md shadow">
                    <a
                        href="#"
                        class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-50 bg-gray-600 md:py-4 md:text-lg md:px-10"
                        @click="backToHome"
                    >
                        Back
                    </a>
                </div>
                <div class="md:ml-3 rounded-md shadow">
                    <a
                        href="#"
                        class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-50 bg-et-green-light md:py-4 md:text-lg md:px-10"
                        @click="login"
                    >
                        Get started
                    </a>
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
            loading: false,
            service: {
                name: "",
                slug: "",
                description: "",
            },
        };
    },
    computed: {
        clientLoggedIn() {
            return this.$store.state.clientAuth.status.loggedIn;
        },

        userLoggedIn() {
            return this.$store.state.adminAuth.status.loggedIn;
        },
    },
    created() {
        this.fetchServiceById();
    },
    methods: {
        fetchServiceById() {
            this.loading = true;
            axios
                .get(`/api/v1/fetch_service/${this.$route.params.slug}`)
                .then((response) => {
                    if (response.data.success) {
                        this.service = response.data.data;
                    }
                    this.loading = false;
                });
        },
        login() {
            if (this.clientLoggedIn || this.userLoggedIn) {
                this.$router.push({ name: "client.tickets.new" });
            } else {
                this.$router.push({ name: "client.signin" });
            }
        },
        backToHome() {
            this.$router.push({ name: "home" });
        },
    },
};
</script>
