<template>
    <div class="lg:grid lg:grid-cols-12 lg:gap-x-5">
        <aside class="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-2">
            <nav class="space-y-1">
                <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    :class="[
                        item.name == currentNavigation
                            ? 'bg-gray-50 text-et-green-light hover:text-et-green hover:bg-white'
                            : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                        'group rounded-md px-3 py-2 flex items-center text-sm font-medium',
                    ]"
                    :aria-current="item.current ? 'page' : undefined"
                    @click="changeNavigation(item.name)"
                >
                    <Component
                        :is="item.icon"
                        :class="[
                            item.name == currentNavigation
                                ? 'text-et-green-light group-hover:text-et-green-light'
                                : 'text-gray-400 group-hover:text-gray-500',
                            'flex-shrink-0 -ml-1 mr-3 h-6 w-6',
                        ]"
                        aria-hidden="true"
                    />
                    <span class="truncate">
                        {{ item.name }}
                    </span>
                </a>
            </nav>
        </aside>

        <div class="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <div v-if="currentNavigation == 'Account'">
                <AdminProfile />
            </div>
            <div v-else-if="currentNavigation == 'Password'">
                <AdminChangePassword />
            </div>

            <div v-else-if="currentNavigation == 'Notification'">
                <AdminNotification />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    KeyIcon,
    UserCircleIcon,
    BellIcon,
    // CreditCardIcon,
    // UserGroupIcon,
    // ViewGridAddIcon,
} from "@heroicons/vue/outline";
import AdminProfile from "./AdminProfile.vue";
import AdminChangePassword from "./AdminChangePassword.vue";
import AdminNotification from "./AdminNotification.vue";

const navigation = [
    {
        name: "Account",
        href: "#",
        icon: UserCircleIcon,
        current: true,
    },
    { name: "Password", href: "#", icon: KeyIcon, current: false },
    { name: "Notification", href: "#", icon: BellIcon, current: false },
    // { name: "Team", href: "#", icon: UserGroupIcon, current: false },
    // { name: "Integrations", href: "#", icon: ViewGridAddIcon, current: false },
];

const currentNavigation = ref("Account");

function changeNavigation(nav) {
    currentNavigation.value = nav;
}
</script>
