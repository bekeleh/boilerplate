<template>
    <div class="min-h-full flex flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-600">
                Welcome to Ethio telecom VAS partners management portal
            </h2>
        </div>
        <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
                <VeeForm @submit="onSubmit">
                    <div v-for="(errs, index) in errors" :key="index">
                        <div v-for="(err, indx) in errs" :key="indx">
                            <ErrorAlert
                                :alert="err"
                                @dismiss-notification="cancelNotification"
                            />
                        </div>
                    </div>
                    <div v-if="alert_message">
                        <ErrorAlert
                            :alert="alert_message"
                            @dismiss-notification="cancelNotification"
                        />
                    </div>
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Email or phone number
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="email"
                                name="email"
                                type="email"
                                rules="required"
                                autocomplete="off"
                                placeholder="Email or phone number"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage class="text-red-600" name="email" />
                        </div>
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <div class="relative w-full mb-2">
                            <label
                                :class="[
                                    showPassword
                                        ? 'bg-et-green text-white'
                                        : 'bg-et-green-light text-gray-50',
                                    'absolute  px-3 py-1  right-0 mx-2 my-1.5 items-center justify-center rounded text-sm font-mono cursor-pointer',
                                ]"
                                for="toggle"
                                @click="toggle"
                            >
                                {{ showPassword ? "hide" : "show" }}
                            </label>
                            <!-- @keyup.enter="onSubmit" -->
                            <VeeField
                                id="password"
                                name="password"
                                :type="showPassword ? 'text' : 'password'"
                                rules="required|min:8|max:32"
                                placeholder="Password"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                name="password"
                                class="text-red-600"
                            />
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input
                                id="remember_me"
                                v-model="remember_me"
                                name="remember_me"
                                type="checkbox"
                                class="mb-2 h-4 w-4 text-et-green focus:bg-et-green-light border-et-green rounded"
                            />
                            <label
                                for="remember-me"
                                class="ml-2 block text-sm text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm">
                            <a
                                href="#"
                                class="font-medium text-et-green hover:text-et-green-light"
                                @click="handleForgotPassword"
                            >
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <!-- :disabled="submission" -->
                        <button
                            type="submit"
                            class="mb-3 mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        >
                            Login
                        </button>
                    </div>
                </VeeForm>
                <div class="text-center mt-4">
                    <p class="block text-sm text-gray-600">
                        I don't have an account?
                        <RouterLink
                            to="/admin-register"
                            class="no-underline text-et-green font-bold hover:text-et-green-light"
                        >
                            Sign up
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorAlert from "../../alerts/ErrorAlert.vue";
export default {
    components: { ErrorAlert },
    data() {
        return {
            showPassword: false,
            loading: false,
            submission: false,
            show_alert: null,
            alert_variant: "bg-red-500",
            alert_message: null,
            remember_me: true,
            errors: [],
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.adminAuth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push({ name: "home" });
        }
    },
    methods: {
        toggle() {
            this.showPassword = !this.showPassword;
        },
        handleForgotPassword() {
            this.$router.push({ name: "admin.forgot.password" });
        },
        onSubmit(values) {
            var user = {
                email: values.email,
                password: values.password,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminAuth/login", user).then(
                (response) => {
                    this.show_alert = true;
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.redirect("admin.tickets.recent");
                    }
                    if (!response.data.success) {
                        this.alert_message = response.data.message;
                    } else {
                        this.alert_message =
                            "Whoops, looks like something went wrong";
                    }
                },
                (err) => {
                    this.loading = false;
                    this.show_alert = false;
                    this.alert_message = "";
                    if (err.response.status === 422) {
                        this.errors = err.response.data.errors;
                    } else if (err.response.status === 429) {
                        this.alert_message =
                            "Too many attempts, Please try again later";
                    } else if (err.response.status === 404) {
                        this.alert_message = err.response.statusText;
                    }
                }
            );
        },

        redirect(route) {
            return this.$router.push({ name: route });
        },

        cancelNotification() {
            this.alert_message = "";
            this.show_alert = "";
        },
    },
};
</script>
