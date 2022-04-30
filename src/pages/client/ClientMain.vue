<template>
    <div class="min-h-full">
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog
                as="div"
                class="fixed inset-0 flex z-40 lg:hidden"
                @close="sidebarOpen = false"
            >
                <TransitionChild
                    as="template"
                    enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0"
                    enter-to="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100"
                    leave-to="opacity-0"
                >
                    <DialogOverlay
                        class="fixed inset-0 bg-gray-600 bg-opacity-75"
                    />
                </TransitionChild>
                <TransitionChild
                    as="template"
                    enter="transition ease-in-out duration-300 transform"
                    enter-from="-translate-x-full"
                    enter-to="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leave-from="translate-x-0"
                    leave-to="-translate-x-full"
                >
                    <div
                        class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-et-blue-light"
                    >
                        <TransitionChild
                            as="template"
                            enter="ease-in-out duration-300"
                            enter-from="opacity-0"
                            enter-to="opacity-100"
                            leave="ease-in-out duration-300"
                            leave-from="opacity-100"
                            leave-to="opacity-0"
                        >
                            <div class="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    @click="sidebarOpen = false"
                                >
                                    <span class="sr-only">Close sidebar</span>
                                    <XIcon
                                        class="h-6 w-6 text-white"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </TransitionChild>
                        <div class="flex-shrink-0 flex items-center px-4">
                            <img
                                class="h-full w-auto"
                                :src="logo"
                                alt="Ethio telecom"
                            />
                        </div>
                        <nav
                            class="mt-5 flex-shrink-0 h-full divide-y divide-cyan-800 overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <div class="px-2 space-y-1">
                                <a
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :href="item.href"
                                    :class="[
                                        item.current
                                            ? 'bg-et-blue-light text-white'
                                            : 'text-cyan-100 hover:text-white hover:bg-et-blue',
                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                                    ]"
                                    :aria-current="
                                        item.current ? 'page' : undefined
                                    "
                                    @click="currentPage = !item.current"
                                >
                                    <Component
                                        :is="item.icon"
                                        class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                                        aria-hidden="true"
                                    />
                                    {{ item.name }}
                                </a>
                            </div>
                            <div class="mt-6 pt-6">
                                <div class="px-2 space-y-1">
                                    <a
                                        v-for="item in secondaryNavigation"
                                        :key="item.name"
                                        :href="item.href"
                                        class="group flex items-center px-2 py-2 text-base font-medium rounded-md text-cyan-100 hover:text-white hover:bg-et-blue"
                                    >
                                        <Component
                                            :is="item.icon"
                                            class="mr-4 h-6 w-6 text-cyan-200"
                                            aria-hidden="true"
                                        />
                                        {{ item.name }}
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
                class="flex flex-col flex-grow bg-et-blue-light pt-5 pb-4 overflow-y-auto"
            >
                <div class="flex items-center flex-shrink-0 px-4">
                    <img
                        class="h-full w-auto"
                        :src="logo"
                        alt="Ethio telecom"
                    />
                </div>
                <nav
                    class="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
                    aria-label="Sidebar"
                >
                    <div class="px-2 space-y-1">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            :class="[
                                currentPage === item.name
                                    ? 'bg-et-blue-light text-white'
                                    : 'text-cyan-100 hover:text-white hover:bg-et-blue',
                                'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md',
                            ]"
                            :aria-current="item.current ? 'page' : undefined"
                            @click="currentPage = item.name"
                        >
                            <Component
                                :is="item.icon"
                                class="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                                aria-hidden="true"
                            />
                            {{ item.name }}
                        </a>
                    </div>
                    <div class="mt-6 pt-6">
                        <div class="px-2 space-y-1">
                            <a
                                v-for="item in secondaryNavigation"
                                :key="item.name"
                                :href="item.href"
                                class="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md text-cyan-100 hover:text-white hover:bg-et-blue"
                            >
                                <Component
                                    :is="item.icon"
                                    class="mr-4 h-6 w-6 text-cyan-200"
                                    aria-hidden="true"
                                />
                                {{ item.name }}
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="lg:pl-64 flex flex-col flex-1">
            <div
                class="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none"
            >
                <button
                    type="button"
                    class="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-et-green lg:hidden"
                    @click="sidebarOpen = true"
                >
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
                </button>
                <!-- Search bar -->
                <div
                    class="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8"
                >
                    <div class="flex-1 flex pt-3">
                        <!-- <a href="/" class="cursor-pointer">Home</a> -->
                    </div>
                    <div class="ml-4 flex items-center md:ml-6">
                        <button
                            type="button"
                            class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        >
                            <span class="sr-only">View notifications</span>

                            <Menu as="div" class="ml-3 relative">
                                <div>
                                    <MenuButton
                                        class="max-w-xs bg-white rounded-full flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                    >
                                        <BellIcon
                                            class="h-7 w-7"
                                            aria-hidden="true"
                                        />
                                        <span
                                            v-if="notifications.length"
                                            class="text-red-600 font-extrabold"
                                            >{{ notifications.length }}</span
                                        >
                                    </MenuButton>
                                </div>
                                <Transition
                                    enter-active-class="transition ease-out duration-100"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-75"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <MenuItems
                                        class="origin-top-right absolute right-0 mt-2 w-80 max-h-screen rounded shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-scroll"
                                    >
                                        <MenuItem
                                            v-for="(
                                                notification, index
                                            ) in notifications"
                                            v-slot="{ active }"
                                            :key="index"
                                        >
                                            <a
                                                :key="index"
                                                href="#"
                                                :class="[
                                                    active ? 'bg-gray-200' : '',
                                                    'block px-2 py-2 text-sm text-gray-700 focus:outline-none border-b border-b-gray-300 opacity-75 hover:opacity-100 hover:font-bold',
                                                ]"
                                                @click="
                                                    handleNotificationClicked(
                                                        notification.data
                                                            .action,
                                                        notification.id,

                                                        notification.data.slug
                                                    )
                                                "
                                            >
                                                <div
                                                    class="flex w-full items-center justify-start"
                                                >
                                                    <InboxIcon
                                                        class="w-5 h-5 m-2"
                                                    />
                                                    {{
                                                        notification.data.title
                                                    }}
                                                </div>
                                            </a>
                                        </MenuItem>
                                        <div class="flex">
                                            <button
                                                v-if="notifications.length"
                                                type="submit"
                                                class="mx-auto px-4 py-2 m-3 flex items-center justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                                                @click="markUsRead"
                                            >
                                                Mark us read
                                            </button>
                                        </div>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </button>

                        <!-- Profile dropdown -->
                        <Menu as="div" class="ml-3 relative">
                            <div>
                                <MenuButton
                                    class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green-light lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                                >
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        :src="avatar"
                                        alt=""
                                    />
                                    <span
                                        class="hidden md:block ml-3 text-gray-700 text-sm font-medium"
                                        ><span class="sr-only"
                                            >Open user menu for </span
                                        >{{ client ? client.name : null }}</span
                                    >
                                    <ChevronDownIcon
                                        class="hidden md:block flex-shrink-0 ml-1 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </MenuButton>
                            </div>
                            <Transition
                                enter-active-class="transition ease-out duration-100"
                                enter-from-class="transform opacity-0 scale-95"
                                enter-to-class="transform opacity-100 scale-100"
                                leave-active-class="transition ease-in duration-75"
                                leave-from-class="transform opacity-100 scale-100"
                                leave-to-class="transform opacity-0 scale-95"
                            >
                                <MenuItems
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                    <MenuItem v-slot="{ active }">
                                        <a
                                            href="#"
                                            :class="[
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700',
                                            ]"
                                            @click="settings"
                                            >Settings</a
                                        >
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <a
                                            href="#"
                                            :class="[
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700',
                                            ]"
                                            @click="viewNotifications"
                                            >Notifications</a
                                        >
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                        <a
                                            href="#"
                                            :class="[
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700',
                                            ]"
                                            @click="logout"
                                            >Logout</a
                                        >
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
            <main class="flex-1 pb-8">
                <div class="mt-2">
                    <RouterView></RouterView>
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import {
    Dialog,
    DialogOverlay,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from "@headlessui/vue";
import {
    BellIcon,
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ScaleIcon,
    XIcon,
    MenuAlt2Icon,
    InboxIcon,
    UserCircleIcon as UserCircleIconOutline,
} from "@heroicons/vue/outline";
import {
    CashIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    OfficeBuildingIcon,
    SearchIcon,
    CalendarIcon,
    ChatAltIcon,
    LockOpenIcon,
    PencilIcon,
    TagIcon,
    UserCircleIcon as UserCircleIconSolid,
    UserAddIcon,
    LocationMarkerIcon,
} from "@heroicons/vue/solid";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const navigation = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
        current: true,
    },
    {
        name: "All Tickets",
        href: "/tickets",
        icon: ClockIcon,
        current: false,
    },
    // {
    //     name: "Services",
    //     href: "/services/list",
    //     icon: ViewListIcon,
    //     current: false,
    // },

    // { name: "Reports", href: "#", icon: DocumentReportIcon, current: false },
];
const secondaryNavigation = [
    // { name: "Settings", href: "#", icon: CogIcon },
    // { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
    // { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const cards = [
    {
        name: "Account balance",
        href: "#",
        icon: ScaleIcon,
        amount: "$30,659.45",
    },
    // More items...
];
const transactions = [
    {
        id: 1,
        name: "Payment to Molly Sanders",
        href: "#",
        amount: "$20,000",
        currency: "USD",
        status: "success",
        date: "July 11, 2020",
        datetime: "2020-07-11",
    },
    // More transactions...
];
const statusStyles = {
    success: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    failed: "bg-gray-100 text-gray-800",
};

export default {
    components: {
        Dialog,
        DialogOverlay,
        Menu,
        MenuButton,
        MenuItem,
        MenuItems,
        TransitionChild,
        TransitionRoot,
        BellIcon,
        CashIcon,
        CheckCircleIcon,
        ChevronDownIcon,
        ChevronRightIcon,
        MenuAlt1Icon,
        OfficeBuildingIcon,
        SearchIcon,
        XIcon,
        UserCircleIconOutline,
        CalendarIcon,
        ChatAltIcon,
        LockOpenIcon,
        MenuAlt2Icon,
        PencilIcon,
        TagIcon,
        UserCircleIconSolid,
        UserAddIcon,
        LocationMarkerIcon,
        InboxIcon,
    },
    setup() {
        const sidebarOpen = ref(false);
        const loggedIn = computed(() => {
            return store.state.clientAuth.status.loggedIn;
        });
        const client = computed(() => {
            return JSON.parse(localStorage.getItem("client"));
        });
        const router = useRouter();
        const store = useStore();
        const currentRoute = computed(() => {
            return router.currentRoute.value.name;
        });

        const notifications = computed(() => {
            return store.getters["clientNotification/getNotifications"] ?? [];
        });

        const logo = "/img/etlogo2.png";
        const avatar = "/img/etavatar.svg";

        onMounted(
            store.dispatch("clientAuth/checkToken").then(
                (response) => {},

                (error) => {}
            ),
            store.dispatch("clientNotification/fetchNotification").then(
                (response) => {},
                (error) => {}
            )
        );
        function markUsRead() {
            store.dispatch("clientNotification/markUsRead").then(
                (response) => {},
                (error) => {}
            );
        }
        function RedirectIfNotAuthenticated() {
            if (loggedIn.value && !client.value.email_verified_at) {
                router.push({ name: "client.email.verification" });
            }
        }

        function handleNotificationClicked(action, id, slug) {
            if (typeof slug == "undefined") {
                router.push({
                    params: {
                        name: action,
                        id: id,
                        prevPage: currentRoute.value,
                    },
                });
            }

            if (typeof action !== "undefined") {
                router.push({
                    name: action,
                    params: {
                        id: id,
                        slug: slug,
                        prevPage: currentRoute.value,
                    },
                });
            }
        }

        function fetchNotification() {
            store.dispatch("clientNotification/fetchNotification").then(
                (response) => {},
                (error) => {}
            );
        }

        function settings() {
            router.push({ name: "client.settings" });
        }

        function logout() {
            store.dispatch("clientAuth/logout").then(
                (response) => {
                    if (response.data.success) {
                        localStorage.removeItem("client");
                        localStorage.removeItem("clientToken");
                        router.push({ path: "/" });
                    }
                },
                (error) => {}
            );
        }

        function viewNotifications() {
            router.push({
                name: "client.view.revenues",
                params: {
                    id: "00a48661-9219-403r7-8314-r8391a5e20407",
                    prevPage: currentRoute.value,
                },
            });
        }

        return {
            navigation,
            secondaryNavigation,
            cards,
            transactions,
            statusStyles,
            sidebarOpen,
            currentRoute,
            currentPage: "All Tickets",
            notifications,
            editing: false,
            view: false,
            viewTable: true,
            employeeNumber: null,
            logo,
            avatar,
            loggedIn,
            markUsRead,
            handleNotificationClicked,
            RedirectIfNotAuthenticated,
            fetchNotification,
            logout,
            client,
            settings,
            viewNotifications,
        };
    },
};
</script>
