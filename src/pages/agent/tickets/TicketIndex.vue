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
                        class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white"
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
                            <img src="img/etlogo2.png" alt="Ethio telecom" />
                        </div>
                        <div class="mt-5 flex-1 h-0 overflow-y-auto">
                            <nav class="px-2">
                                <div class="space-y-1">
                                    <a
                                        v-for="item in navigation"
                                        :key="item.name"
                                        :href="item.href"
                                        :class="[
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                                            'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md',
                                        ]"
                                        :aria-current="
                                            item.current ? 'page' : undefined
                                        "
                                    >
                                        <Component
                                            :is="item.icon"
                                            :class="[
                                                item.current
                                                    ? 'text-gray-500'
                                                    : 'text-gray-400 group-hover:text-gray-500',
                                                'mr-3 flex-shrink-0 h-6 w-6',
                                            ]"
                                            aria-hidden="true"
                                        />
                                        {{ item.name }}
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </TransitionChild>
                <div class="flex-shrink-0 w-14" aria-hidden="true">
                    <!-- Dummy element to force sidebar to shrink to fit close icon -->
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div
            class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100"
        >
            <div class="flex items-center flex-shrink-0 px-6">
                <img
                    src="img/etlogo.png"
                    class="h-12 w-auto"
                    alt="Ethio telecom"
                />
            </div>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
                <!-- User account dropdown -->
                <Menu as="div" class="px-3 relative inline-block text-left">
                    <div>
                        <MenuButton
                            class="group w-full bg-gray-100 rounded-md mt-2 px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-200 focus:ring-et-green"
                        >
                            <span
                                class="flex w-full justify-between items-center"
                            >
                                <span
                                    class="flex min-w-0 items-center justify-between space-x-3"
                                >
                                    <img
                                        class="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                        src="img/etavatar.svg"
                                        alt=""
                                    />
                                    <span class="flex-1 flex flex-col min-w-0">
                                        <span
                                            class="text-gray-900 text-sm font-medium truncate"
                                            >{{ user ? user.name : null }}</span
                                        >
                                        <span
                                            class="text-gray-500 text-sm truncate"
                                            >{{
                                                user ? user.email : null
                                            }}</span
                                        >
                                    </span>
                                </span>
                                <SelectorIcon
                                    class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                            </span>
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
                            class="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                        >
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        to="/client/profile"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        >View profile</RouterLink
                                    >
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        to="/client/profile"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        >Settings</RouterLink
                                    >
                                </MenuItem>
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        to="/client/notification"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        >Notifications</RouterLink
                                    >
                                </MenuItem>
                            </div>
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                    <a
                                        href="#"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        >Support</a
                                    >
                                </MenuItem>
                            </div>
                            <div class="py-1">
                                <MenuItem v-slot="{ active }">
                                    <RouterLink
                                        to="/logout"
                                        :class="[
                                            active
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-700',
                                            'block px-4 py-2 text-sm',
                                        ]"
                                        >Logout</RouterLink
                                    >
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
                <!-- Navigation -->
                <nav class="px-3 mt-6">
                    <div class="space-y-1">
                        <a
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            :class="[
                                item.current
                                    ? 'bg-gray-200 text-gray-900'
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                            ]"
                            :aria-current="item.current ? 'page' : undefined"
                        >
                            <Component
                                :is="item.icon"
                                :class="[
                                    item.current
                                        ? 'text-gray-500'
                                        : 'text-gray-400 group-hover:text-gray-500',
                                    'mr-3 flex-shrink-0 h-6 w-6',
                                ]"
                                aria-hidden="true"
                            />
                            {{ item.name }}
                        </a>
                    </div>
                </nav>
            </div>
        </div>
        <!-- Main column -->
        <div class="lg:pl-64 flex flex-col">
            <!-- Search header -->
            <div
                class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden"
            >
                <button
                    type="button"
                    class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-et-green lg:hidden"
                    @click="sidebarOpen = true"
                >
                    <span class="sr-only">Open sidebar</span>
                    <MenuAlt1Icon class="h-6 w-6" aria-hidden="true" />
                </button>
                <div class="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                    <div class="flex items-center">
                        <!-- Profile dropdown -->
                        <Menu as="div" class="ml-3 relative">
                            <div>
                                <MenuButton
                                    class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                                >
                                    <span class="sr-only">Open user menu</span>
                                    <img
                                        class="h-8 w-8 rounded-full"
                                        src="img/etavatar.svg"
                                        alt=""
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
                                    class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                                >
                                    <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                            <RouterLink
                                                to="/client/profile"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]"
                                                >View profile</RouterLink
                                            >
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <RouterLink
                                                to="/client/profile"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]"
                                                >Settings</RouterLink
                                            >
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <RouterLink
                                                to="/client/notification"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]"
                                                >Notifications</RouterLink
                                            >
                                        </MenuItem>
                                    </div>
                                    <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                            <a
                                                href="#"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]"
                                                >Support</a
                                            >
                                        </MenuItem>
                                    </div>
                                    <div class="py-1">
                                        <MenuItem v-slot="{ active }">
                                            <RouterLink
                                                to="/logout"
                                                :class="[
                                                    active
                                                        ? 'bg-gray-100 text-gray-900'
                                                        : 'text-gray-700',
                                                    'block px-4 py-2 text-sm',
                                                ]"
                                                >Logout</RouterLink
                                            >
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
            <main class="flex-1">
                <!-- Page title & actions -->
                <div
                    class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
                >
                    <div class="flex-1 min-w-0">
                        <h1
                            class="text-lg font-medium leading-6 text-gray-900 sm:truncate"
                        >
                            Home
                        </h1>
                    </div>
                    <div class="mt-4 flex sm:mt-0 sm:ml-4">
                        <button
                            type="button"
                            class="order-0 inline-flex items-center pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                            @click="newTicket"
                        >
                            <PlusIcon class="h-4 w-4 mr-1" />
                            New Request
                        </button>
                    </div>
                </div>
                <div v-if="newRequest">
                    <TicketNew />
                </div>
                <div v-if="!newRequest">
                    <TicketsTable />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import TicketsTable from "./TicketsTable.vue";
import TicketNew from "./TicketNew.vue";
import { ref } from "vue";
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
    ClockIcon,
    HomeIcon,
    MenuAlt1Icon,
    ViewListIcon,
    XIcon,
    PlusIcon,
} from "@heroicons/vue/outline";
import {
    ChevronRightIcon,
    DotsVerticalIcon,
    SearchIcon,
    SelectorIcon,
} from "@heroicons/vue/solid";

const navigation = [
    { name: "Home", href: "#", icon: HomeIcon, current: true },
    { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
    { name: "Recent", href: "#", icon: ClockIcon, current: false },
];
const teams = [
    { name: "Engineering", href: "#", bgColorClass: "bg-et-green-light" },
    { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
    { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];
const projects = [
    {
        id: 1,
        title: "GraphQL API",
        initials: "GA",
        team: "Engineering",
        members: [
            {
                name: "Dries Vincent",
                handle: "driesvincent",
                imageUrl:
                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Lindsay Walton",
                handle: "lindsaywalton",
                imageUrl:
                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Courtney Henry",
                handle: "courtneyhenry",
                imageUrl:
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
            {
                name: "Tom Cook",
                handle: "tomcook",
                imageUrl:
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            },
        ],
        totalMembers: 12,
        lastUpdated: "March 17, 2020",
        pinned: true,
        bgColorClass: "bg-pink-600",
    },
    // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

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
        ChevronRightIcon,
        DotsVerticalIcon,
        MenuAlt1Icon,
        SearchIcon,
        SelectorIcon,
        XIcon,
        PlusIcon,
        TicketsTable,
        TicketNew,
    },
    data() {
        const sidebarOpen = ref(false);
        return {
            navigation,
            teams,
            projects,
            pinnedProjects,
            sidebarOpen,
            show: false,
            user: null,
            newRequest: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        // if (!this.loggedIn) {
        //     this.$router.push("/login");
        // }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("client"));
    },
    methods: {
        newTicket() {
            this.newRequest = !this.newRequest;
        },
    },
};
</script>
