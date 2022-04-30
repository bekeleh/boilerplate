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
                            Email verification link sent!
                        </h2>
                        <p class="mt-1 text-base text-gray-500">
                            Please check your e-mail address and try again.
                        </p>
                    </div>
                    <div
                        class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6"
                    >
                        <a
                            href="#"
                            class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-et-green-light bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                            @click="handleEmailResend"
                        >
                            Resend
                        </a>
                        <a
                            href="#"
                            class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-et-green-light hover:bg-et-green md:py-4 md:text-lg md:px-10"
                            @click="handleLogin"
                            >Login
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
            this.$router.push({ name: "admin.signin" });
        },
        handleEmailResend() {
            let data = {
                email: localStorage.getItem("email"),
            };
            this.loading = true;
            this.$store.dispatch("adminAuth/emailResend", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data.success) {
                        this.redirect("admin.email.verification");
                    } else {
                        this.show_alert = true;
                        this.alert_message = response.data.message;
                    }
                },
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    if (!error.response.data.success) {
                        this.alert_message = error.response.data.message;
                    } else {
                        this.alert_message =
                            "Whoops, looks like something went wrong";
                    }
                }
            );
        },
    },
};
</script>
