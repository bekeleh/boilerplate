<template>
    <div class="p-8 space-y-8 divide-y divide-gray-200">
        <VeeForm>
            <div class="space-y-8 divide-y divide-gray-200">
                <div>
                    <h3 class="text-lg leading-6 font-medium text-gray-500">
                        Service Details
                    </h3>
                </div>
                <div class="pt-3">
                    <div
                        class="mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                    >
                        <!-- group -->
                        <div class="sm:col-span-6">
                            <label
                                for="category"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Category
                            </label>
                            <div class="mt-1">
                                <VueMultiselect
                                    v-model="selectedCategories"
                                    :options="categories"
                                    :searchable="true"
                                    :taggable="true"
                                    :allow-empty="false"
                                    tag-placeholder="Add this as new tag"
                                    placeholder="Type to search"
                                    label="name"
                                    track-by="name"
                                    @tag="createCategory"
                                    @search-change="loadCategories"
                                >
                                    <span slot="noResult" class="text-gray-700">
                                        Oops! No elements found. Consider
                                        changing the search query.
                                    </span>
                                    >
                                </VueMultiselect>
                            </div>
                        </div>
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
                                    v-model="service.name"
                                    type="text"
                                    name="name"
                                    readonly
                                    autocomplete="given-name"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label
                                for="imageUrl"
                                class="block text-sm font-medium text-gray-700"
                            >
                                imageUrl
                            </label>
                            <div class="mt-1">
                                <input
                                    id="imageUrl"
                                    v-model="service.imageUrl"
                                    type="text"
                                    name="imageUrl"
                                    readonly
                                    autocomplete="imageUrl"
                                    class="shadow-sm focus:ring-et-green-light focus:border-et-green-light block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                            </div>
                        </div>

                        <!-- description -->
                        <div class="sm:col-span-6">
                            <label
                                for="description"
                                class="block text-sm font-medium text-gray-700"
                                >Description</label
                            >
                            <div class="mt-1">
                                <textarea
                                    id="description"
                                    v-model="service.description"
                                    rows="4"
                                    name="description"
                                    disabled
                                    class="shadow-sm focus:border-et-green-light focus:ring-et-green-light block w-full sm:text-sm border border-gray-300 rounded-md"
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
                                v-model="service.is_active"
                                :disabled="true"
                                :class="[
                                    service.is_active
                                        ? 'bg-et-green-light'
                                        : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                ]"
                            >
                                <span class="sr-only">Use setting</span>
                                <span
                                    aria-hidden="true"
                                    :class="[
                                        service.is_active
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
                        Back
                    </button>
                </div>
            </div>
        </VeeForm>
    </div>
</template>
<script>
import axios from "axios";
import VueMultiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.css";
import { ref } from "vue";
import { Switch } from "@headlessui/vue";
import "vue-multiselect/dist/vue-multiselect.css";
export default {
    components: {
        Switch,
        VueMultiselect,
    },

    data() {
        const enabled = ref(false);
        return {
            enabled,
            loading: false,
            id: null,

            categories: [],
            selectedCategories: [],
            categoryTimeout: null,

            schema: {
                name: "required",
                imageUrl: "required",
            },

            service: {
                id: null,
                name: null,
                imageUrl: null,
                description: null,
                is_active: false,
            },
        };
    },
    created() {
        this.fetchService();
    },
    methods: {
        fetchService() {
            this.$store
                .dispatch(
                    "adminService/fetchServiceById",
                    this.$route.params.id
                )
                .then(
                    (response) => {
                        this.service = response.data.data;
                        this.selectedCategories = response.data.data.category;
                        this.selectedRequisitions =
                            response.data.data.requisitions;
                        this.selectedRequirements =
                            response.data.data.requirements;
                        this.selectedUsers = response.data.data.users;
                        this.service.is_active = this.service.is_active
                            ? true
                            : false;
                    },
                    (error) => {}
                );
        },

        handleCancel() {
            this.$router.push({ name: "admin.services" });
        },
        loadCategories(search) {
            const params = {
                search: search,
            };
            if (this.categoryTimeout) {
                clearInterval(this.categoryTimeout);
            }
            this.loading = true;
            this.categoryTimeout = setTimeout(() => {
                axios
                    .get(`/api/v1/category_options`, { params })
                    .then((res) => {
                        this.categories = res.data.data;
                        this.loading = false;
                    });
            }, 300);
        },
        clearCategories() {
            this.selectedCategories = [];
        },
        createCategory(searchQuery) {
            const params = {
                search: searchQuery,
            };
            axios.post(`/api/v1/category_options`, params).then((res) => {
                this.selectedCategories.push(res.data.data);
            });
        },
    },
};
</script>
