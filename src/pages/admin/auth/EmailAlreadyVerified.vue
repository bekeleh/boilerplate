<template>
    <div
        class="bg-white min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8"
    >
        <div class="max-w-max mx-auto">
            <main class="sm:flex">
                <div class="sm:ml-6">
                    <div class="sm:pl-6">
                        <h2
                            class="text-xl font-extrabold text-gray-900 tracking-tight sm:text-2xl"
                        >
                            Your email is already verified!
                        </h2>
                    </div>
                    <div
                        class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
                    >
                        <a
                            href="#"
                            class="inline-flex text-gray-100hover:text-white items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green-light"
                            @click="handleLogin"
                        >
                            Login
                        </a>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
    methods: {
        handleLogin() {
            this.$router.push({ name: "admin.login" });
        },
    },
};
</script>
