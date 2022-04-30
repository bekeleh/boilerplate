<template>
    <div class="h-full bg-white">
        <div>
            <RouterView></RouterView>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from "./default-partials/Footer";

export default {
    components: {
        Footer,
    },
};
</script>

<style scoped></style>
