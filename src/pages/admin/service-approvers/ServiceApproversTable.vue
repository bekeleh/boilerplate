<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-0 my-6">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
                <div
                    class="mt-3 p-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"
                >
                    <div class="sm:col-span-6">
                        <div v-if="alert_success_message">
                            <SuccessAlert
                                :alert="alert_success_message"
                                @dismiss-notification="
                                    handleDismissNotification
                                "
                            />
                        </div>
                        <div v-if="alert_error_message">
                            <ErrorAlert
                                :alert="alert_error_message"
                                @dismiss-notification="
                                    handleDismissNotification
                                "
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="shadow-md overflow-hidden border border-gray-200 sm:rounded-lg"
                >
                    <!-- Sidebar Search -->
                    <div
                        class="md:flex items-center justify-center m-3 p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div
                            class="sm:w-full mt-4 md:flex items-center justify-start"
                        >
                            <div
                                v-if="can('create', 'service-approver')"
                                class="mt-4 p-3 flex sm:mt-0 sm:ml-4"
                            >
                                <button
                                    type="button"
                                    class="order-0 inline-flex items-center pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green sm:order-1 sm:ml-3"
                                    @click="newService"
                                >
                                    <PlusIcon class="h-4 w-4 mr-1" />
                                    New Service Approver
                                </button>
                            </div>
                        </div>
                        <div
                            class="md:flex items-center justify-end max-w-lg w-full lg:max-w-xs"
                        >
                            <div>
                                <label for="search" class="sr-only"
                                    >Search</label
                                >
                                <div
                                    class="relative text-gray-500 focus-within:text-gray-500"
                                >
                                    <div
                                        class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center justify-center"
                                    >
                                        <SearchIcon
                                            class="h-5 w-5"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        id="search"
                                        v-model="search"
                                        autocomplete="off"
                                        class="block w-full md:w-80 bg-white py-2 pl-10 pr-3 border border-gray-400 rounded-md leading-5 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green-light focus:border-et-green-light focus:placeholder-gray-500"
                                        placeholder="Search"
                                        type="text"
                                        name="search"
                                        @keyup.enter="Filter"
                                    />
                                </div>
                            </div>
                            <div
                                class="md:flex flex-1 items-center justify-center"
                            >
                                <button
                                    type="button"
                                    :disabled="disableSearchBtn"
                                    :class="[
                                        disableSearchBtn
                                            ? 'bg-gray-400 order-0 cursor-default '
                                            : '  hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green bg-et-green-light ',
                                        'inline-flex m-1 sm:order-1 sm:ml-3 pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                                    ]"
                                    @click="Filter"
                                >
                                    <FilterIcon class="h-4 w-4 mr-1" />
                                    Search
                                </button>
                                <button
                                    type="button"
                                    :class="[
                                        disableSearchBtn
                                            ? 'bg-gray-400 order-0 cursor-default '
                                            : 'bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green',
                                        'md:inline-flex m-1 sm:order-1 sm:ml-3  pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                                    ]"
                                    @click="clearFilter"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ID
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service Name
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service Category
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Description
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Created at
                                </th>
                                <th scope="col" class="relative px-2 py-2">
                                    <span class="sr-only">View</span>
                                </th>
                                <th scope="col" class="relative px-2 py-2">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="services.length">
                            <tr
                                v-for="(service, serviceIdx) in services"
                                :key="serviceIdx"
                                :class="
                                    serviceIdx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                "
                                class="hover:text-et-green hover:bg-indigo-200"
                            >
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ service.id }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ service.service_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ service.category_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{
                                        service.is_active == 1
                                            ? "inactive"
                                            : "active"
                                    }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ service.description }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ service.created_at }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a
                                        v-if="can('view', 'service-approver')"
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="viewService(service.id)"
                                        >View</a
                                    >
                                    <a
                                        v-if="can('edit', 'service-approver')"
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="editService(service.id)"
                                        >Edit</a
                                    >

                                    <a
                                        v-if="can('delete', 'service-approver')"
                                        onclick="confirm('Are you sure you want delete this Record?') || event.stopImmediatePropagation()"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="deleteService(service.id)"
                                    >
                                        Delete
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td class="pl-5">No data available</td>
                            </tr>
                        </tbody>
                    </table>
                    <div
                        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    >
                        <div class="flex-1 flex justify-between sm:hidden">
                            <a
                                href="#"
                                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                @click="
                                    pagination.prev_page_url
                                        ? onChange(pagination.prev_page_url)
                                        : pagination.prev_page_url
                                "
                            >
                                Previous
                            </a>
                            <a
                                href="#"
                                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                @click="
                                    pagination.next_page_url
                                        ? onChange(pagination.next_page_url)
                                        : pagination.next_page_url
                                "
                            >
                                Next
                            </a>
                        </div>
                        <div
                            class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
                        >
                            <div>
                                <p class="text-sm text-gray-700">
                                    <span
                                        v-if="
                                            pagination.total >
                                            pagination.per_page
                                        "
                                    >
                                        Show
                                        <select
                                            id="show"
                                            v-model="pagination.per_page"
                                            name="show"
                                            class="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            @change="fetchServiceApprover"
                                        >
                                            <option
                                                v-for="(
                                                    item, itemIdx
                                                ) in pageList"
                                                :key="itemIdx"
                                                :value="item"
                                            >
                                                {{ item }}
                                            </option>
                                        </select>
                                    </span>
                                    Showing
                                    {{ " " }}
                                    <span class="font-medium">{{
                                        pagination.current_page
                                    }}</span>
                                    {{ " " }}
                                    to
                                    {{ " " }}
                                    <span class="font-medium">{{
                                        pagination.per_page
                                    }}</span>
                                    {{ " " }}
                                    of
                                    {{ " " }}
                                    <span class="font-medium">{{
                                        pagination.total
                                    }}</span>
                                    {{ " " }}
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    <div
                                        v-for="(
                                            link, index
                                        ) in pagination.links"
                                        :key="index"
                                    >
                                        <a
                                            aria-current="page"
                                            :class="
                                                link.active
                                                    ? 'z-10 bg-indigo-50 border-et-green-light text-et-green'
                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50' &&
                                                      link.url
                                                    ? 'cursor-pointer'
                                                    : null
                                            "
                                            class="bg-white hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                            @click="
                                                link.url
                                                    ? onChange(link.url)
                                                    : link.url
                                            "
                                        >
                                            <span v-html="link.label"></span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useAbility } from "@casl/vue";
import { PlusIcon, SearchIcon, FilterIcon } from "@heroicons/vue/outline";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
export default {
    components: { PlusIcon, SearchIcon, FilterIcon, SuccessAlert, ErrorAlert },
    data() {
        const { can } = useAbility();
        return {
            can,
            alert_success_message: null,
            alert_error_message: null,
            search: "",
            loading: false,
            submission: false,
            show_alert: null,
            alert_message: null,
            services: [],
            pageList: [10, 20, 30, 50, 100, 150, 200, 500, 1000],
            pagination: {
                page: 1,
                first_page_url: "",
                next_page_url: "",
                last_page_url: "",
                prev_page_url: "",
                last_page: "",
                from: "",
                to: "",
                total: "",
                path: "",
                per_page: 10,
                links: {},
                current_page: 1,
            },
        };
    },
    computed: {
        disableSearchBtn() {
            return this.isNullOrEmpty(this.search);
        },
    },
    created() {
        this.fetchServiceApprover();
    },
    methods: {
        clearFilter() {
            this.search = "";
            this.fetchServiceApprover();
        },
        Filter() {
            if (!this.disableSearchBtn) this.fetchServiceApprover();
        },
        newService() {
            this.$router.push({ name: "admin.service_approvers.new" });
        },
        editService(id) {
            this.$router.push({
                name: "admin.service_approvers.edit",
                params: { id: id },
            });
        },
        viewService(id) {
            this.$router.push({
                name: "admin.service_approvers.view",
                params: { id: id },
            });
        },
        deleteService(id) {
            this.$store
                .dispatch("adminServiceApprover/delete", id)
                .then((response) => {
                    if (response.data.success) {
                        this.alert_success_message = response.data.message;
                        this.fetchServiceApprover();
                    } else {
                        this.loading = false;
                        this.alert_error_message =
                            "Whoops, looks like something went wrong";
                    }
                    (error) => {
                        this.loading = false;
                        this.alert_error_message = error.response.data.message;
                    };
                });
        },
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        fetchServiceApprover() {
            this.loading = true;
            this.$store
                .dispatch("adminServiceApprover/fetchServiceApprover", {
                    page: this.pagination.page,
                    per_page: this.pagination.per_page,
                    search: this.search,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data) {
                            this.services = response.data.data;
                            this.pagination.links = response.data.links;
                            this.pagination.current_page =
                                response.data.current_page;
                            this.pagination.total = response.data.total;
                            this.pagination.from = response.data.from;
                            this.pagination.to = response.data.to;
                            this.pagination.per_page = response.data.per_page;
                            this.pagination.prev_page_url =
                                response.data.prev_page_url;
                            this.pagination.next_page_url =
                                response.data.next_page_url;
                        } else {
                            this.loading = false;
                            this.show_alert = true;
                            this.alert_message =
                                "Whoops, looks like something went wrong";
                        }
                    },
                    (error) => {
                        this.loading = false;
                        this.show_alert = true;
                        this.alert_error_message = error.response.data.message;
                    }
                );
        },
        onChange(url) {
            let query = {
                url: url,
                search: this.search,
                per_page: this.pagination.per_page,
            };
            this.loading = true;
            this.$store.dispatch("adminServiceApprover/paginate", query).then(
                (response) => {
                    this.services = response.data.data;
                    this.pagination.links = response.data.links;
                    this.pagination.current_page = response.data.current_page;
                    this.pagination.total = response.data.total;
                    this.pagination.from = response.data.from;
                    this.pagination.to = response.data.to;
                    this.pagination.per_page = response.data.per_page;
                    this.pagination.prev_page_url = response.data.prev_page_url;
                    this.pagination.next_page_url = response.data.next_page_url;
                },
                (error) => {}
            );
        },
    },
};
</script>
