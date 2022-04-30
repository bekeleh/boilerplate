<template>
    <div class="h-full bg-white">
        <div>
            <RouterView></RouterView>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from './default-partials/Footer.vue'

export default {
    components: {
        Footer,
    },
}
</script>

<style scoped></style>
