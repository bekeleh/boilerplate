<template>
    <div class="min-h-full flex flex-col justify-center py-3 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-600">
                Ethio telecom VAS partners management sign up portal
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
                    <!-- employee id -->
                    <div>
                        <label
                            for="employee_number"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Employee ID
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="employee_number"
                                name="employee_number"
                                type="text"
                                autocomplete="employee_number"
                                rules="required|min:3|max:5"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                class="text-red-600"
                                name="employee_number"
                            />
                        </div>
                    </div>
                    <!-- first name -->
                    <div>
                        <label
                            for="first_name"
                            class="block text-sm font-medium text-gray-700"
                        >
                            first name
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="first_name"
                                name="first_name"
                                type="text"
                                autocomplete="first_name"
                                rules="required|min:3|max:50|alpha_spaces"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                class="text-red-600"
                                name="first_name"
                            />
                        </div>
                    </div>
                    <!-- middle name -->
                    <div>
                        <label
                            for="middle_name"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Middle name
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="middle_name"
                                name="middle_name"
                                type="text"
                                autocomplete="middle_name"
                                rules="required|min:3|max:50|alpha_spaces"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                class="text-red-600"
                                name="middle_name"
                            />
                        </div>
                    </div>
                    <!-- last name -->
                    <div>
                        <label
                            for="last_name"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Last name
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="last_name"
                                name="last_name"
                                type="text"
                                autocomplete="last_name"
                                rules="required|min:3|max:50|alpha_spaces"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                class="text-red-600"
                                name="last_name"
                            />
                        </div>
                    </div>
                    <!-- email -->
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Email address
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="email"
                                name="email"
                                type="email"
                                autocomplete="email"
                                rules="required|email"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage class="text-red-600" name="email" />
                        </div>
                    </div>
                    <!-- phone -->
                    <div>
                        <label
                            for="phone"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Phone number
                        </label>
                        <div class="mb-2">
                            <input
                                id="phone"
                                v-model="value"
                                name="phone"
                                type="text"
                                autocomplete="phone"
                                required
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                                placeholder="0911..."
                                @input="acceptNumber"
                                @blur="checkMobileNumber"
                            />
                            <!-- <ErrorMessage class="text-red-600" name="phone" /> -->
                            <span
                                v-if="phone_rule_validate"
                                class="text-red-600"
                                >This field phone is required.</span
                            >
                        </div>
                    </div>
                    <!-- password -->
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
                            <VeeField
                                id="password"
                                name="password"
                                :type="showPassword ? 'text' : 'password'"
                                rules="required|min:8|max:32"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                name="password"
                                class="text-red-600"
                            />
                        </div>
                    </div>
                    <!-- password Confirmation -->
                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Password confirmation
                        </label>
                        <div class="mb-2">
                            <VeeField
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autocomplete="password_confirmation"
                                rules="password_mismatch:@password"
                                class="appearance-none block w-full px-3 py-2 border border-et-green-light rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm"
                            />
                            <ErrorMessage
                                name="password_confirmation"
                                class="text-red-600"
                            />
                        </div>
                    </div>
                    <!-- button -->
                    <div>
                        <button
                            :disabled="submission"
                            type="submit"
                            class="mb-3 mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-et-green hover:bg-et-green-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        >
                            Signup
                        </button>
                    </div>
                </VeeForm>
                <div class="text-center mt-4">
                    <p class="block text-sm text-gray-600">
                        Already have an account?
                        <RouterLink
                            to="/admin-login"
                            class="no-underline text-et-green font-bold hover:text-et-green-light"
                        >
                            Login
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ErrorAlert from "../../alerts/ErrorAlert";

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
            value: "",
            mobile_number: "",
            errors: [],

            schema: {
                first_name: "required|min:3|max:50",
                middle_name: "required|min:3|max:50",
                last_name: "required|min:3|max:50",
                email: "required|min:3|max:50|email",
                employee_number: "required|min:1|max:10",
                password: "required|min:8|max:32",
                password_confirmation: "required|min:8|max:32",
            },
        };
    },
    computed: {
        phone_rule_validate() {
            return this.mobile_number;
        },
        loggedIn() {
            return this.$store.state.adminAuth.status.loggedIn;
        },
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push("/admin/settings");
        }
    },
    created() {},
    methods: {
        checkMobileNumber() {
            this.isNullOrEmpty(this.value)
                ? (this.mobile_number = true)
                : (this.mobile_number = false);
        },
        acceptNumber() {
            let x = this.value.replace(/\D/g, "").match(/(\d{0,5})(\d{0,5})/);
            this.value = !x[2] ? x[1] : x[1] + (x[2] ? x[2] : "");
        },
        toggle() {
            this.showPassword = !this.showPassword;
        },
        onSubmit(values) {
            let user = {
                first_name: values.first_name,
                middle_name: values.middle_name,
                last_name: values.last_name,
                email: values.email,
                phone: this.value,
                employee_number: values.employee_number,
                password: values.password,
                password_confirmation: values.password_confirmation,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminAuth/register", user).then(
                (response) => {
                    this.loading = false;
                    if (response.data.success) {
                        this.redirect("admin.login");
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
                    this.show_alert = true;
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
