<template>
    <div>
        <Component :is="layout"></Component>
    </div>
</template>

<script>
import HomeLayout from './pages/layouts/HomeLayout.vue'
import DefaultLayout from './pages/layouts/DefaultLayout.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        HomeLayout,
        DefaultLayout,
    },
    setup() {
        const router = useRouter()
        const layout = computed(() => {
            return router.currentRoute.value.meta.layout
                ? router.currentRoute.value.meta.layout
                : 'home-layout'
        })
        return {
            layout,
        }
    },
}
</script>

<style scoped></style>
