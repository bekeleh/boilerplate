<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm :validation-schema="schema" @submit="onEditSubmit">
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Status Details
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <div class="sm:col-span-4">
                            <label
                                for="name"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div class="mt-1">
                                <input
                                    id="name"
                                    v-model="status.name"
                                    type="text"
                                    name="name"
                                    readonly
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <!-- disable -->
                        <div class="sm:col-span-4">
                            <label
                                for="is_active"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Disable
                            </label>
                            <Switch
                                v-model="enabled"
                                :disabled="true"
                                :class="[
                                    enabled
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        enabled
                                            ? 'translate-x-5'
                                            : 'translate-x-0',
                                        'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                                    ]"
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pt-5 mb-8">
                <div class="flex justify-items-end">
                    <button
                        type="button"
                        class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                        @click="handleCancel"
                    >
                        back
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
    components: {
        Switch,
    },

    emits: ["cancel:status-view"],
    data() {
        const enabled = ref(false);
        return {
            enabled,
            loading: false,
            id: null,

            schema: {
                name: "required",
            },

            status: {
                id: null,
                name: null,
                is_active: 0,
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.fetchStatus(this.id);
    },
    methods: {
        fetchStatus(id) {
            this.$store.dispatch("adminStatus/fetchStatusById", id).then(
                (response) => {
                    this.status = response.data.data;
                    this.enabled = this.status.is_active ? true : false;
                },
                (error) => {}
            );
        },
        handleCancel() {
            this.$router.push({ name: "admin.statuses" });
        },
    },
};
</script>
