<template>
    <div
        class="mt-10 p-6 sm:mt-0 md:w-1/2 sm:w-full mx-auto items-center justify-items-center"
    >
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
        <div class="sm:col-span-6">
            <div class="px-4 py-5 bg-white">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Reset Password
                </h3>
            </div>
            <VeeForm :validation-schema="schema" @submit="changePassword">
                <div class="shadow overflow-hidden sm:rounded-md p-6">
                    <div class="col-span-6 sm:col-span-6">
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Phone number</label
                        >
                        <VeeField
                            id="email"
                            v-model="user.email"
                            type="email"
                            name="email"
                            class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                        <ErrorMessage class="text-red-600" name="email" />
                    </div>
                    <div class="col-span-6 sm:col-span-6">
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
                                {{ showPassword ? 'hide' : 'show' }}
                            </label>
                            <VeeField
                                id="password"
                                v-model="user.password"
                                :type="showPassword ? 'text' : 'password'"
                                name="password"
                                class="mt-1 focus:ring-et-green-light focus:border-et-green-light block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>
                        <ErrorMessage class="text-red-600" name="password" />
                    </div>

                    <div class="col-span-6 sm:col-span-6">
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
                                {{ showPassword ? 'hide' : 'show' }}
                            </label>
                            <VeeField
                                id="password_confirmation"
                                v-model="user.password_confirmation"
                                :type="showPassword ? 'text' : 'password'"
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
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                    >
                        Submit
                    </button>
                </div>
            </VeeForm>
        </div>
    </div>
</template>
<script>
import SuccessAlert from '../../alerts/SuccessAlert.vue'
import ErrorAlert from '../../alerts/ErrorAlert.vue'

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
            alert_variant: 'bg-red-500',
            alert_success_message: null,
            alert_error_message: null,
            schema: {
                email: 'required',
                password: 'required|min:8|max:32',
                password_confirmation: 'password_mismatch:@password',
            },
            user: {
                email: '',
                password: '',
                password_confirmation: '',
            },
        }
    },
    created() {},
    methods: {
        toggle() {
            this.showPassword = !this.showPassword
        },
        changePassword(values, actions) {
            let data = {
                email: values.email,
                password: values.password,
                password_confirmation: values.password_confirmation,
                token: this.$route.params.token,
            }
            this.submission = true
            this.loading = true
            this.$store.dispatch('clientAuth/resetPassword', data).then(
                (response) => {
                    this.loading = false
                    if (response.data && response.data.success) {
                        // this.alert_success_message = response.data.message;
                        // actions.resetForm(); // 👈 Reset Form
                        this.redirect('client.signin')
                    } else {
                        this.alert_error_message = response.data.message
                    }
                },
                (error) => {
                    this.loading = false
                    if (!error.response.data.success) {
                        this.alert_success_message = error.response.data.message
                    } else {
                        this.alert_success_message =
                            'Whoops, looks like something went wrong'
                    }
                }
            )
        },
        reset() {
            this.user.password = ''
            this.user.password_confirmation = ''
        },
        handleDismissNotification() {
            this.alert_success_message = null
            this.alert_error_message = null
        },
        redirect(route) {
            this.$router.push({ name: route })
        },
    },
}
</script>
