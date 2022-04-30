<template>
    <div class="h-full bg-white">
        <Navbar />
        <div>
            <RouterView></RouterView>
        </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from "./default-partials/Navbar";
import Footer from "./default-partials/Footer";
export default {
    components: {
        Navbar,
        Footer,
    },
};
</script>

<style scoped></style>
