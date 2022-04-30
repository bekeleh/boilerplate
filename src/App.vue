<template>
    <div>
        <Component :is="layout"></Component>
    </div>
</template>

<script>
import HomeLayout from "./pages/layouts/HomeLayout";
import DefaultLayout from "./pages/layouts/DefaultLayout";
import UserLayout from "./pages/layouts/UserLayout";
import ClientLayout from "./pages/layouts/ClientLayout";
import AdminLayout from "./pages/layouts/AdminLayout";
import AgentLayout from "./pages/layouts/AgentLayout";
export default {
    components: {
        DefaultLayout,
        HomeLayout,
        UserLayout,
        ClientLayout,
        AdminLayout,
        AgentLayout,
    },
    setup() {
        return {
            defaultLayout: "home-layout",
        };
    },
    computed: {
        layout() {
            return this.$route.meta.layout
                ? this.$route.meta.layout
                : this.defaultLayout;
        },
    },
    mounted() {},
};
</script>

<style scoped></style>
