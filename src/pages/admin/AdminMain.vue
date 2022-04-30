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
                            class="mt-5 flex-shrink-0 h-full divide-y divide-et-blue overflow-y-auto"
                            aria-label="Sidebar"
                        >
                            <div
                                v-for="item in navigation"
                                :key="item.name"
                                class="px-2 space-y-1"
                            >
                                <a
                                    v-if="item.permission"
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
                            <div class="mt-6 mb-12 pt-6">
                                <div
                                    v-for="item in secondaryNavigation"
                                    :key="item.name"
                                    class="px-2 space-y-1"
                                >
                                    <!-- v-if="item.permission" -->
                                    <a
                                        v-if="item.permission"
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
                    class="mt-5 flex-1 flex flex-col divide-y divide-et-blue-light overflow-y-auto"
                    aria-label="Sidebar"
                >
                    <div
                        v-for="item in navigation"
                        :key="item.name"
                        class="px-2 space-y-1"
                    >
                        <!-- v-if="can('view', item.permission.toLowerCase())" -->
                        <a
                            v-if="item.permission"
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
                    <div class="mt-6 mb-12 pt-6">
                        <div
                            v-for="item in secondaryNavigation"
                            :key="item.name"
                            class="px-2 space-y-1"
                        >
                            <!-- v-if="can('view', item.permission.toLowerCase())" -->
                            <a
                                v-if="item.permission"
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
                                        class="hidden ml-3 text-gray-700 text-sm font-medium md:block"
                                        ><span class="sr-only"
                                            >Open user menu for </span
                                        >{{
                                            user
                                                ? user.first_name +
                                                  " " +
                                                  user.middle_name
                                                : null
                                        }}</span
                                    >
                                    <ChevronDownIcon
                                        class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
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

<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
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
    CogIcon,
    DocumentReportIcon,
    MenuAlt1Icon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    XIcon,
    ArchiveIcon,
    ViewListIcon,
    InboxIcon,
    HomeIcon,
    SearchIcon,
} from "@heroicons/vue/outline";
import {
    ChevronDownIcon,
    UsersIcon,
    TagIcon,
    UserAddIcon,
    LocationMarkerIcon,
} from "@heroicons/vue/solid";
import { useAbility } from "@casl/vue";

const statusStyles = {
    success: "bg-green-100 text-green-800",
    processing: "bg-yellow-100 text-yellow-800",
    failed: "bg-gray-100 text-gray-800",
};

const store = useStore();
const router = useRouter();
const currentRoute = computed(() => {
    return router.currentRoute.value.name;
});
const { can } = useAbility();
const sidebarOpen = ref(false);
const logo = "/img/etlogo2.png";
const avatar = "/img/etavatar.svg";
const currentPage = ref("All Tickets");

const notifications = computed(() => {
    return store.getters["adminNotification/getNotifications"] ?? [];
});

const user = computed(() => {
    return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
});

onMounted(
    store.dispatch("adminAuth/checkToken").then(
        (response) => {},

        (error) => {}
    ),
    store.dispatch("adminNotification/fetchNotification").then(
        (response) => {},
        (error) => {}
    )
);

function logout() {
    store.dispatch("adminAuth/logout").then(
        (response) => {
            if (response.data.success) {
                localStorage.removeItem("user");
                localStorage.removeItem("userToken");
                router.push({ name: "admin.login" });
            }
        },
        (error) => {}
    );
}

function handleNotificationClicked(routePage, id, slug) {
    router.push({
        name: routePage,
        params: {
            id: id,
            slug: slug,
            prevPage: currentRoute.value,
        },
    });
}
function settings() {
    router.push({ name: "admin.settings" });
}

function markUsRead() {
    store.dispatch("adminNotification/markUsRead").then(
        (response) => {},
        (error) => {}
    );
}

const navigation = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
        current: true,
        permission: true,
    },
    {
        name: "Search",
        href: "/admin/tickets/search",
        icon: SearchIcon,
        current: true,
        permission: can("view", "ticket"),
    },
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: DocumentReportIcon,
        current: true,
        permission: can("view", "dashboard"),
    },
    {
        name: "Recent",
        href: "/admin/tickets/recent",
        icon: ClockIcon,
        current: false,
        permission: can("assign", "ticket"),
    },
    {
        name: "Assigned to",
        href: "/admin/tickets/assigned",
        icon: TagIcon,
        current: false,
        permission: can("assign", "ticket"),
    },
    {
        name: "Closed",
        href: "/admin/tickets/closed",
        icon: ArchiveIcon,
        current: false,
        permission: can("access", "ticket"),
    },
    {
        name: "Approval Tickets",
        href: "/admin/tickets/approval",
        icon: ShieldCheckIcon,
        current: false,
        permission: can("approve", "ticket"),
    },
    {
        name: "My Tickets",
        href: "/admin/tickets/my",
        icon: ViewListIcon,
        current: false,
        permission: can("verify", "ticket"),
    },
    {
        name: "Users",
        href: "/admin/users",
        icon: UserAddIcon,
        current: false,
        permission: can("view", "user"),
    },
    {
        name: "Roles",
        href: "/admin/roles",
        icon: UsersIcon,
        current: false,
        permission: can("view", "role"),
    },
    {
        name: "Permissions",
        href: "/admin/permissions",
        icon: UsersIcon,
        current: false,
        permission: can("view", "permission"),
    },
    {
        name: "Categories",
        href: "/admin/categories",
        icon: CogIcon,
        current: false,
        permission: can("view", "category"),
    },
    {
        name: "Statuses",
        href: "/admin/statuses",
        icon: CogIcon,
        current: false,
        permission: can("view", "status"),
    },
    {
        name: "Priorities",
        href: "/admin/priorities",
        icon: CogIcon,
        current: false,
        permission: can("view", "priority"),
    },
    {
        name: "Requisition Services",
        href: "/admin/requisitions",
        icon: CogIcon,
        current: false,
        permission: can("view", "requisition"),
    },
    {
        name: "Requisition Requirements",
        href: "/admin/requisition-requirements",
        icon: CogIcon,
        current: false,
        permission: can("view", "requisition-requirement"),
    },
    {
        name: "Services",
        href: "/admin/services",
        icon: CogIcon,
        current: false,
        permission: can("view", "service"),
    },
    {
        name: "Service Approvers",
        href: "/admin/service-approvers",
        icon: CogIcon,
        current: false,
        permission: can("view", "service-approver"),
    },
    {
        name: "Requirements",
        href: "/admin/requirements",
        icon: CogIcon,
        current: false,
        permission: can("view", "requirement"),
    },
    {
        name: "Regions",
        href: "/admin/regions",
        icon: LocationMarkerIcon,
        current: false,
        permission: can("view", "region"),
    },
    {
        name: "Zones",
        href: "/admin/zones",
        icon: LocationMarkerIcon,
        current: false,
        permission: can("view", "zone"),
    },
    {
        name: "Woredas",
        href: "/admin/woredas",
        icon: LocationMarkerIcon,
        current: false,
        permission: can("view", "woreda"),
    },
    {
        name: "Clients",
        href: "/admin/clients",
        icon: UserGroupIcon,
        current: false,
        permission: can("view", "client"),
    },
    {
        name: "FAQ",
        href: "/admin/faqs",
        icon: DocumentReportIcon,
        current: false,
        permission: can("view", "faq"),
    },
    {
        name: "Reports",
        href: "/admin/reports",
        icon: DocumentReportIcon,
        current: false,
        permission: can("view", "report"),
    },
];
const secondaryNavigation = [
    {
        name: "Settings",
        href: "/admin/settings",
        icon: CogIcon,
        permission: can("view", "settings"),
    },
    {
        name: "Help",
        href: "#",
        icon: QuestionMarkCircleIcon,
        permission: can("view", "help"),
    },
    {
        name: "Privacy",
        href: "#",
        icon: ShieldCheckIcon,
        permission: can("view", "privacy"),
    },
];
</script>
