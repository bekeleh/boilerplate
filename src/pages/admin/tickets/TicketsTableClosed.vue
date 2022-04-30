<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-0 my-6">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
            >
                <div
                    class="shadow-md overflow-hidden border border-gray-200 sm:rounded-lg"
                >
                    <!-- Sidebar Search -->
                    <div
                        class="md:flex items-center justify-center m-3 p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div
                            class="md:flex items-center justify-end max-w-lg w-full lg:max-w-xs"
                        >
                            <!-- <div>
                                <select
                                    id="status"
                                    v-model="ticketStatus"
                                    name="status"
                                    class="block m-2 text-base border-gray-300 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm rounded-md"
                                >
                                    <option value="" selected>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(status, statusIdx) in statuses"
                                        :key="statusIdx"
                                        :value="status.id"
                                    >
                                        {{ status.name }}
                                    </option>
                                </select>
                            </div> -->
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
                                    S.No.
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Ticket number
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Service
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Category
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
                                    Company Name
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contacts Name
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
                                    Region
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Zone
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Woreda
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Location
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Building
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Assigned to
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Created at
                                </th>
                                <th scope="col" class="relative px-2 py-2">
                                    <span class="sr-only">Show</span>
                                </th>
                                <th scope="col" class="relative px-2 py-2">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="tickets.length">
                            <tr
                                v-for="(ticket, ticketIdx) in tickets"
                                :key="ticketIdx"
                                :class="
                                    ticketIdx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                "
                                class="hover:text-et-green hover:bg-indigo-200"
                            >
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                                >
                                    {{ ticket.id }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
                                >
                                    {{ ticket.tt_number }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.service_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.category_name }}
                                </td>

                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.status_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.company_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.client_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.phone }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.region_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.zone_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ ticket.woreda_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.location }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.building }}
                                </td>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {{ ticket.assigned_to }}
                                </th>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.created_at }}
                                </td>
                                <td
                                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                                >
                                    <a
                                        v-if="can('verify', 'ticket')"
                                        href="#"
                                        class="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="
                                            viewTicket(ticket.tt_number)
                                        "
                                        >View</a
                                    >
                                </td>
                                <td
                                    class="whitespace-nowrap text-center text-sm font-medium"
                                >
                                    <a
                                        href="#"
                                        @click.stop="
                                            postComment(ticket.tt_number)
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
                                            @change="fetchClosedTicket"
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
                                            @click.prevent="
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
import axios from "axios";
import { SearchIcon, FilterIcon, ChatIcon } from "@heroicons/vue/outline";
import { useAbility } from "@casl/vue";
export default {
    components: {
        SearchIcon,
        FilterIcon,
        ChatIcon,
    },
    data() {
        const { can } = useAbility();
        return {
            can,
            loading: false,
            submission: false,
            show_alert: null,
            alert_message: null,
            search: "",
            tickets: [],
            statuses: [],
            ticketStatus: "",
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
            return (
                this.isNullOrEmpty(this.search) &&
                this.isNullOrEmpty(this.ticketStatus)
            );
        },
    },
    created() {
        this.loadStatuses();
        this.fetchClosedTicket();
    },
    methods: {
        clearFilter() {
            this.search = "";
            this.ticketStatus = "";
            this.fetchClosedTicket();
        },
        Filter() {
            if (!this.disableSearchBtn) this.fetchClosedTicket();
        },
        approveTicket(slug) {
            this.$router.push({
                name: "admin.tickets.view_closed",
                params: { slug: slug },
            });
        },
        assignTicket(slug) {
            this.$router.push({
                name: "admin.tickets.assign",
                params: { slug: slug, route: "admin.tickets.closed" },
            });
        },
        viewTicket(slug) {
            this.$router.push({
                name: "admin.tickets.view_closed",
                params: { slug: slug },
            });
        },
        postComment(slug) {
            this.$router.push({
                name: "admin.tickets.comments",
                params: {
                    slug: slug,
                    route: "admin.tickets.my",
                    prevPage: this.$router.currentRoute.value.name,
                },
            });
        },
        fetchClosedTicket() {
            this.loading = true;
            this.$store
                .dispatch("adminTicket/fetchClosedTicket", {
                    page: this.pagination.page,
                    per_page: this.pagination.per_page,
                    search: this.search,
                    filter: this.ticketStatus,
                })
                .then(
                    (response) => {
                        this.loading = false;
                        if (response.data) {
                            this.tickets = response.data.data;
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
            this.$store.dispatch("adminTicket/paginateClosed", query).then(
                (response) => {
                    this.tickets = response.data.data;
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
        loadStatuses(search) {
            const params = {
                search: search,
            };
            if (this.statusTimeout) {
                clearInterval(this.statusTimeout);
            }
            this.loading = true;
            this.statusTimeout = setTimeout(() => {
                axios.get(`/api/v1/status_options`, { params }).then((res) => {
                    this.statuses = res.data.data;
                    this.loading = false;
                });
            }, 300);
        },
    },
};
</script>
