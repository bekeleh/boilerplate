<template>
    <Popover
        class="relative bg-white w-full border border-b-gray-100 shadow-md"
    >
        <div class="flex justify-between items-center">
            <div class="flex bg-white rounded-tr-3xl md:justify-start py-1/2">
                <a href="#" @click="backToHome">
                    <span class="sr-only">Ethio telecom</span>
                    <img
                        class="w-48 md:w-52 lg:w-60 items-center justify-center"
                        :src="etLog"
                        alt="Ethio telecom"
                    />
                </a>
            </div>
            <div class="-mr-2 -my-2 md:hidden">
                <PopoverButton
                    class="bg-white border-2 items-center justify-center cursor-pointer border-et-green-light rounded-md mt-2 mx-4 px-4 py-1 inline-flex text-gray-400 hover:text-gray-500 hover:bg-et-green-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-et-green-light"
                >
                    <span class="sr-only">Open menu</span>
                    <MenuIcon
                        class="h-4 w-4 items-center justify-center cursor-pointer"
                        aria-hidden="true"
                    />
                </PopoverButton>
            </div>
            <div
                class="hidden md:flex items-center justify-center md:flex-1 lg:w-0 cursor-pointer"
                @click="loadFAQ"
            >
                <p class="font-medium text-gray-600">
                    Frequently Asked Questions
                </p>
            </div>
            <div
                class="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
            >
                <button
                    v-if="clientLoggedIn"
                    type="button"
                    class="mr-1 flex items-center pr-4 pl-3 py-2 text-sm font-medium text-et-blue focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1 sm:ml-3"
                    @click="logout"
                >
                    Logout
                </button>

                <button
                    v-if="clientLoggedIn"
                    type="button"
                    class="mr-3 flex items-center pr-4 pl-3 py-2 text font-medium text-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1 sm:ml-3"
                    @click="serviceRequest"
                >
                    <!-- <BackspaceIcon class="h-4 w-4 ml-1 mr-2" /> -->
                    Back
                </button>

                <button
                    v-if="userLoggedIn"
                    type="button"
                    class="mr-1 flex items-center pr-4 pl-3 py-2 text-sm font-medium text-et-blue focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1 sm:ml-3"
                    @click="userLogout"
                >
                    Logout
                </button>
                <button
                    v-if="userLoggedIn"
                    type="button"
                    class="mr-3 flex items-center pr-4 pl-3 py-2 text font-medium text-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 sm:order-1 sm:ml-3"
                    @click="backToAdminPage"
                >
                    <!-- <BackspaceIcon class="h-4 w-4 ml-1 mr-2" /> -->
                    Back
                </button>
                <div v-else>
                    <a
                        v-if="!clientLoggedIn"
                        href="/login"
                        class="ml-2 whitespace-nowrap text-base font-medium text-et-green-light cursor-pointer"
                    >
                        Login
                    </a>
                    <a
                        v-if="!clientLoggedIn"
                        href="/signup"
                        class="ml-2 mr-6 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 text-base font-medium text-et-blue cursor-pointer"
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>

        <Transition
            enter-active-class="duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="duration-100 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <PopoverPanel
                focus
                class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
                <div
                    class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gray-50 divide-y-2 divide-gray-50"
                >
                    <div class="pt-5 pb-6 px-5">
                        <div class="flex items-center justify-between">
                            <div>
                                <img
                                    class="h-10 w-auto"
                                    :src="etLog"
                                    alt="Ethio telecom"
                                />
                            </div>
                            <div class="-mr-2">
                                <PopoverButton
                                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-et-green-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-et-green-light"
                                >
                                    <span class="sr-only">Close menu</span>
                                    <XIcon
                                        class="h-6 w-6 cursor-pointer"
                                        aria-hidden="true"
                                    />
                                </PopoverButton>
                            </div>
                        </div>
                    </div>
                    <div class="py-6 px-5">
                        <button
                            v-if="clientLoggedIn"
                            type="button"
                            class="order-0 inline-flex items-center m-2 pr-4 pl-3 py-2 border border-transparent text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="logout"
                        >
                            Logout
                        </button>
                        <button
                            v-if="clientLoggedIn"
                            type="button"
                            class="order-0 inline-flex items-center pr-4 pl-3 py-2 border border-transparent text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="serviceRequest"
                        >
                            Back
                        </button>
                        <button
                            v-if="userLoggedIn"
                            type="button"
                            class="order-0 inline-flex items-center m-2 pr-4 pl-3 py-2 border border-transparent text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="userLogout"
                        >
                            Logout
                        </button>
                        <button
                            v-if="userLoggedIn"
                            type="button"
                            class="order-0 inline-flex items-center pr-4 pl-3 py-2 border border-transparent text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="backToAdminPage"
                        >
                            <!-- <BackspaceIcon class="h-4 w-4" /> -->
                            Back
                        </button>

                        <div v-else class="mt-6">
                            <a
                                v-if="!clientLoggedIn"
                                href="/signup"
                                class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-et-green-light hover:bg-et-green"
                            >
                                Sign up
                            </a>
                            <p
                                v-if="!clientLoggedIn"
                                class="mt-6 text-center text-base font-medium text-gray-500"
                            >
                                Already have an account?
                                {{ " " }}
                                <a href="/login" class="text-et-green">
                                    Login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </PopoverPanel>
        </Transition>
    </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import {
    ChartBarIcon,
    CursorClickIcon,
    DocumentReportIcon,
    MenuIcon,
    RefreshIcon,
    ShieldCheckIcon,
    ViewGridIcon,
    XIcon,
} from "@heroicons/vue/outline";
import { BackspaceIcon } from "@heroicons/vue/solid";

const solutions = [
    {
        name: "SMS",
        description:
            "Get a better understanding of where your traffic is coming from.",
        href: "#",
        icon: ChartBarIcon,
    },
    {
        name: "Voice",
        description:
            "Speak directly to your customers in a more meaningful way.",
        href: "#",
        icon: CursorClickIcon,
    },
    {
        name: "VISP",
        description: "Your customers' data will be safe and secure.",
        href: "#",
        icon: ShieldCheckIcon,
    },
    {
        name: "API",
        description:
            "Connect with third-party tools that you're already using.",
        href: "#",
        icon: ViewGridIcon,
    },
    {
        name: "M2P",
        description:
            "Connect with third-party tools that you're already using.",
        href: "#",
        icon: ViewGridIcon,
    },
    {
        name: "M2M",
        description:
            "Build strategic funnels that will drive your customers to convert",
        href: "#",
        icon: RefreshIcon,
    },
    {
        name: "USSD",
        description:
            "Get detailed reports that will help you make more informed decisions ",
        href: "#",
        icon: DocumentReportIcon,
    },
    {
        name: "OBD",
        description:
            "Get detailed reports that will help you make more informed decisions ",
        href: "#",
        icon: DocumentReportIcon,
    },
];
const resources = [
    {
        name: "Help Center",
        description:
            "Get all of your questions answered in our forums or contact support.",
        href: "#",
    },
    {
        name: "Guides",
        description:
            "Learn how to maximize our platform to get the most out of it.",
        href: "#",
    },
    {
        name: "Events",
        description:
            "See what meet-ups and other events we might be planning near you.",
        href: "#",
    },
    {
        name: "Security",
        description: "Understand how we take your privacy seriously.",
        href: "#",
    },
];
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
export default {
    components: {
        Popover,
        PopoverButton,
        PopoverPanel,
        MenuIcon,
        XIcon,
        BackspaceIcon,
    },
    setup() {
        const route = useRouter();
        const store = useStore();
        // function loadServices(search) {
        //     const params = {
        //         search: search,
        //     };
        //     if (this.serviceTimeout) {
        //         clearInterval(this.serviceTimeout);
        //     }
        //     this.loading = true;
        //     this.serviceTimeout = setTimeout(() => {
        //         Axios.get(`/api/v1/service_options`, { params }).then((res) => {
        //             this.services = res.data.data;
        //             this.loading = false;
        //         });
        //     }, 300);
        // }

        const clientLoggedIn = computed(() => {
            return store.state.clientAuth.status.loggedIn;
        });

        const userLoggedIn = computed(() => {
            return store.state.adminAuth.status.loggedIn;
        });

        const client = computed(() => {
            return JSON.parse(localStorage.getItem("client"));
        });

        const user = computed(() => {
            return JSON.parse(localStorage.getItem("user"));
        });

        function loadFAQ() {
            route.push({ name: "client.faqs" });
        }

        function backToHome() {
            route.push({ name: "home" });
        }

        function backToAdminPage() {
            route.push({ name: "admin.tickets" });
        }

        function serviceRequest() {
            route.push({ name: "client.tickets" });
        }

        function serviceDetail(slug) {
            route.push({
                name: "services.detail.external",
                params: { slug: slug },
            });
        }

        function logout() {
            store.dispatch("clientAuth/logout").then(
                (response) => {
                    if (response.data.success) {
                        store.commit("clientAuth/loginFailure", []);
                        localStorage.removeItem("client");
                        localStorage.removeItem("clientToken");
                        route.push({ path: "/" });
                    }
                },
                (error) => {}
            );
        }

        function userLogout() {
            store.dispatch("adminAuth/logout").then(
                (response) => {
                    if (response.data.success) {
                        store.commit("adminAuth/loginFailure", []);
                        localStorage.removeItem("user");
                        localStorage.removeItem("userToken");
                        route.push({ name: "admin.login" });
                    }
                },
                (error) => {}
            );
        }

        return {
            clientLoggedIn,
            userLoggedIn,
            client,
            user,
            userLogout,
            logout,
            loadFAQ,
            backToHome,
            backToAdminPage,
            serviceRequest,
            serviceDetail,

            solutions,
            resources,
            etLog: "img/edc291aa-9fb8-4737-a53c-308c20e9b59f-290x90.svg",
            // etLog: require("img/cropped-Ethiotelcom_Logo-01-1-1536x423.png"),
        };
    },
};
</script>
