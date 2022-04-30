<template>
    <div class="mt-10 p-6 sm:mt-0">
        <div class="sm:col-span-6">
            <div v-if="alert_success_message">
                <SuccessAlert
                    :alert="alert_success_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
            <div v-if="alert_error_message">
                <ErrorAlert
                    :alert="alert_error_message"
                    @dismiss-notification="handleDismissNotification"
                />
            </div>
        </div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        Change Password
                    </h3>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <VeeForm :validation-schema="schema" @submit="changePassword">
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-6">
                                    <label
                                        for="current-password"
                                        class="block text-sm font-medium text-gray-700"
                                        >Current Password</label
                                    >
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
                                            id="current_password"
                                            v-model="profile.current_password"
                                            :type="
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            name="current_password"
                                            class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="current_password"
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="new-password"
                                        class="block text-sm font-medium text-gray-700"
                                        >New Password</label
                                    >
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
                                            id="new_password"
                                            v-model="profile.new_password"
                                            :type="
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            "
                                            name="new_password"
                                            class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="new_password"
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label
                                        for="confirm-password"
                                        class="block text-sm font-medium text-gray-700"
                                        >Confirm new password</label
                                    >
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
                                            id="password_confirmation"
                                            v-model="
                                                profile.password_confirmation
                                            "
                                            type="password"
                                            name="password_confirmation"
                                            class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <ErrorMessage
                                        class="text-red-600"
                                        name="password_confirmation"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                                type="submit"
                                :submission="submission"
                                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </VeeForm>
            </div>
        </div>
    </div>
</template>
<script>
import SuccessAlert from "../../alerts/SuccessAlert";
import ErrorAlert from "../../alerts/ErrorAlert.vue";

export default {
    components: {
        SuccessAlert,
        ErrorAlert,
    },
    data() {
        return {
            showPassword: false,
            loading: false,
            submission: false,
            alert_variant: "bg-red-500",
            alert_success_message: null,
            alert_error_message: null,
            schema: {
                current_password: "required|min:8|max:32",
                new_password: "required|min:8|max:32",
                password_confirmation: "password_mismatch:@new_password",
            },
            profile: {
                current_password: "",
                password: "",
                password_confirmation: "",
            },
        };
    },
    created() {},
    methods: {
        toggle() {
            this.showPassword = !this.showPassword;
        },
        changePassword(values, actions) {
            let data = {
                current_password: values.current_password,
                new_password: values.new_password,
                password_confirmation: values.password_confirmation,
            };
            this.submission = true;
            this.loading = true;
            this.$store.dispatch("adminAuth/changePassword", data).then(
                (response) => {
                    this.loading = false;
                    if (response.data && response.data.success) {
                        this.alert_success_message = response.data.message;
                        actions.resetForm(); // 👈 Reset Form
                    } else {
                        this.alert_error_message = response.data.message;
                    }
                },
                (error) => {
                    this.loading = false;
                    if (!error.response.data.success) {
                        this.alert_success_message = error.response.data.errors;
                    } else {
                        this.alert_success_message =
                            "Whoops, looks like something went wrong";
                    }
                }
            );
        },
        reset() {
            this.profile.current_password = "";
            this.profile.new_password = "";
            this.profile.password_confirmation = "";
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
    },
};
</script>
