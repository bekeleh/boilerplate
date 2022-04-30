<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-0 my-6">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
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
                <div
                    class="shadow-md overflow-hidden border border-gray-200 sm:rounded-lg"
                >
                    <!-- Sidebar Search -->
                    <div
                        class="md:flex items-center justify-center m-3 p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div
                            v-if="can('export', 'client')"
                            class="md:flex items-center justify-start"
                        >
                            <div>
                                <select
                                    id="extension"
                                    v-model="extension"
                                    name="status"
                                    class="block m-2 text-base border-gray-300 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm rounded-md"
                                >
                                    <option selected disabled>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(ext, extIndx) in exts"
                                        :key="extIndx"
                                        :value="ext.format"
                                    >
                                        {{ ext.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    :disabled="customers.length == 0"
                                    :class="[
                                        customers.length == 0
                                            ? 'bg-gray-400 order-0 cursor-default '
                                            : '  hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green bg-et-green-light ',
                                        'inline-flex m-1 sm:order-1 sm:ml-3 pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                                    ]"
                                    @click="
                                        exportToCsv(
                                            customers,
                                            export_fields,
                                            extension,
                                            prefix
                                        )
                                    "
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        class="md:flex items-center justify-center m-3 p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div class="md:flex items-center justify-start">
                            <div>
                                <select
                                    id="selected"
                                    v-model="selected"
                                    name="selected"
                                    class="block m-2 text-base border-gray-300 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm rounded-md"
                                >
                                    <option selected disabled>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(field, fieldIndx) in fields"
                                        :key="fieldIndx"
                                        :value="field"
                                    >
                                        {{ field }}
                                    </option>
                                </select>
                            </div>
                            <div class="md:flex">
                                <input
                                    id="date_from"
                                    v-model="date_from"
                                    class="block md:w-1/2 mx-3 bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                                    placeholder="date from"
                                    type="date"
                                    name="date_from"
                                />
                                <input
                                    id="date_to"
                                    v-model="date_to"
                                    class="block md:w-1/2 mx-3 bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                                    placeholder="date to"
                                    type="date"
                                    name="date_to"
                                />
                                <input
                                    id="date_to_time"
                                    v-model="date_to_time"
                                    class="block md:w-1/2 mx-3 bg-white border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green focus:border-et-green focus:placeholder-gray-500 sm:text-sm"
                                    placeholder="date to time"
                                    type="time"
                                    name="date_to_time"
                                />
                            </div>
                        </div>
                        <div class="md:flex flex-1 items-center justify-end">
                            <!-- search text -->
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
                                        class="block w-1/2 md:w-full bg-white py-2 pl-10 pr-3 border border-gray-400 rounded-md leading-5 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green-light focus:border-et-green-light focus:placeholder-gray-500"
                                        placeholder="Search"
                                        type="text"
                                        name="search"
                                        @keyup.enter="Filter"
                                    />
                                </div>
                            </div>
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
                                    Company name
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Full name
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Phone
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Verified Customer
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Last logged in
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email verified at
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
                        <tbody v-if="customers.length">
                            <tr
                                v-for="(customer, customerIdx) in customers"
                                :key="customerIdx"
                                :class="
                                    customerIdx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                "
                                class="hover:text-et-green hover:bg-indigo-200"
                            >
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ customer.id }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ customer.company_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ customer.name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ customer.email }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ customer.phone }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{
                                        customer.is_verified_client
                                            ? "verified"
                                            : "not verified"
                                    }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ fromNow(customer.last_logged_in_at) }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ customer.email_verified_at }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ customer.created_at }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a
                                        v-if="can('view', 'client')"
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="viewCustomer(customer.id)"
                                        >View</a
                                    >
                                    <a
                                        v-if="can('edit', 'client')"
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="editCustomer(customer.id)"
                                        >Edit</a
                                    >
                                    <a
                                        v-if="can('delete', 'client')"
                                        onclick="confirm('Are you sure you want delete this Record?') || event.stopImmediatePropagation()"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="
                                            deleteCustomer(customer.id)
                                        "
                                    >
                                        Delete
                                    </a>
                                </td>
                                <td
                                    class="whitespace-nowrap text-center text-sm font-medium"
                                >
                                    <a
                                        href="#"
                                        @click.stop="
                                            revenueNotification(customer.id)
                                        "
                                    >
                                        <ChatIcon class="w-6 h-6 mr-2" />
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
                                            @change="fetchCustomer"
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
import { ChatIcon, SearchIcon, FilterIcon } from "@heroicons/vue/outline";
import { useAbility } from "@casl/vue";
import SuccessAlert from "../../alerts/SuccessAlert.vue";
import ErrorAlert from "../../alerts/ErrorAlert.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
    components: { ChatIcon, SearchIcon, FilterIcon, SuccessAlert, ErrorAlert },
    data() {
        const { can } = useAbility();
        const loading = ref("");
        const store = useStore();
        const router = useRouter;
        const customers = ref([]);
        const search = ref("");
        const selected = ref("created_at");
        const date_from = ref("");
        const date_to = ref("");
        const date_to_time = ref("");
        const pageList = ref([10, 20, 30, 50, 100, 150, 200, 500, 1000]);
        const fields = ref(["created_at", "updated_at"]);
        const extension = ref(".csv");
        const exts = ref([
            { name: "excel", format: ".xlsx" },
            { name: "csv", format: ".csv" },
        ]);
        const prefix = "vas_customer_list_";
        const export_fields = [
            {
                label: "Company name",
                value: "company_name",
            },
            {
                label: "Contact full name",
                value: "name",
            },
            {
                label: "E-mail",
                value: "email",
            },
            {
                label: "Mobile number",
                value: "phone",
            },
            // {
            //     label: "Location",
            //     value: "location",
            // },
            // {
            //     label: "Building",
            //     value: "building",
            // },
            // {
            //     label: "Region name",
            //     value: "region_name",
            // },
            // {
            //     label: "Zone name",
            //     value: "zone_name",
            // },
            // {
            //     label: "Woreda name",
            //     value: "woreda_name",
            // },
            {
                label: "Created at",
                value: "created_at",
            },
            {
                label: "Updated at",
                value: "updated_at",
            },
        ];
        return {
            prefix,
            date_from,
            date_to,
            date_to_time,
            store,
            router,
            selected,
            fields,
            export_fields,
            extension,
            exts,
            can,
            search,
            loading,
            submission: false,
            alert_success_message: "",
            alert_error_message: "",
            customers,
            pageList,
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
            return (
                this.isNullOrEmpty(this.search) &&
                this.isNullOrEmpty(this.date_from) &&
                this.isNullOrEmpty(this.date_to)
            );
        },
    },
    created() {
        this.fetchCustomer();
    },
    methods: {
        clearFilter() {
            this.date_from = "";
            this.date_to = "";
            this.date_to_time = "";
            this.search = "";
            this.fetchCustomer();
        },
        revenueNotification(customerId) {
            this.$router.push({
                name: "admin.notify.revenues",
                params: {
                    clientId: customerId,
                    prevPage: this.$router.currentRoute.value.name,
                },
            });
        },
        clearFiltering() {
            this.customers = [];
            this.selected = "";
            this.extension = "";
            this.search = "";
            this.date_from = "";
            this.date_to = "";
            this.date_to_time = "";
        },
        Filter() {
            this.fetchCustomer();
        },
        newRole() {
            this.$router.push({
                name: "admin.customers.new",
            });
        },
        editCustomer(id) {
            this.$router.push({
                name: "admin.customers.edit",
                params: { id: id },
            });
        },
        viewCustomer(id) {
            this.$router.push({
                name: "admin.customers.view",
                params: { id: id },
            });
        },
        fetchCustomer() {
            this.loading = true;
            this.$store
                .dispatch("adminCustomer/fetchCustomer", {
                    page: this.pagination.page,
                    per_page: this.pagination.per_page,
                    search: this.search,
                    selected: this.selected,
                    dateFrom: this.date_from,
                    dateTo: this.date_to,
                    dateToTime: this.date_to_time,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data) {
                            this.customers = response.data.data;
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
                per_page: this.pagination.per_page,
                search: this.search,
                selected: this.selected,
                dateFrom: this.date_from,
                dateTo: this.date_to,
                dateToTime: this.date_to_time,
            };
            this.loading = true;
            this.$store.dispatch("adminCustomer/paginate", query).then(
                (response) => {
                    this.customers = response.data.data;
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
        handleDismissNotification() {
            this.alert_success_message = null;
            this.alert_error_message = null;
        },
        deleteCustomer(id) {
            this.$store
                .dispatch("adminCustomer/delete", id)
                .then((response) => {
                    if (response.data.success) {
                        this.alert_success_message = response.data.message;
                        this.fetchCustomer();
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
    },
};
</script>
