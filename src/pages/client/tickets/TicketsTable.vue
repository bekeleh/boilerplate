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
                            class="sm:w-full mt-4 md:flex items-center justify-start"
                        >
                            <div
                                v-if="openTicket >= 4"
                                class="flex flex-1 items-center justify-start mb-2"
                            >
                                <ExclamationIcon class="w-6 h-6 text-red-600" />
                                <span class="text-red-600">
                                    You reached maximum allowed new ticket
                                    creation.
                                </span>
                            </div>
                            <button
                                v-if="openTicket < 4"
                                type="button"
                                class="order-0 sm:order-1 flex items-center justify-start mb-2 pl-2 pr-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-et-green-light hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green"
                                @click="newTicket"
                            >
                                <PlusIcon class="h-4 w-4 mr-1" />
                                New Request
                            </button>
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
                                        class="block w-full md:w-80 bg-white py-2 pl-10 pr-3 border border-gray-400 rounded-md leading-5 text-gray-500 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-et-green-light focus:border-et-green-light focus:placeholder-gray-500"
                                        placeholder="Search"
                                        type="text"
                                        autocomplete="off"
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
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
                                >
                                    S.No.
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-800 uppercase tracking-wider"
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
                                    Created at
                                </th>
                                <th
                                    scope="col"
                                    class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Updated at
                                </th>
                                <th
                                    scope="col"
                                    colspan="2"
                                    class="relative px-2 py-2"
                                >
                                    <span class="sr-only">Action</span>
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
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                                >
                                    {{ ticket.id }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer"
                                >
                                    {{ ticket.tt_number }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500 cursor-pointer"
                                >
                                    {{ ticket.service_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500 cursor-pointer"
                                >
                                    {{ ticket.category_name }}
                                </td>

                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.status_name }}
                                </td>

                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.created_at }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ ticket.updated_at }}
                                </td>
                                <td
                                    class="whitespace-nowrap text-center text-sm font-medium"
                                >
                                    <a
                                        v-if="ticket.client_id == client.id"
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer m-3"
                                        @click.stop="
                                            viewTicket(ticket.tt_number)
                                        "
                                        >View</a
                                    >
                                    <a
                                        v-if="
                                            ticket.status_id == '1' &&
                                            ticket.client_id == client.id &&
                                            ticket.is_reject_approve == '1'
                                        "
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="
                                            editTicket(ticket.tt_number)
                                        "
                                        >Edit</a
                                    >
                                    <a
                                        v-if="
                                            ticket.client_id == client.id &&
                                            ticket.status_id != '4' &&
                                            ticket.handler_user_id == null &&
                                            ticket.document_status == '2'
                                        "
                                        href="#"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="
                                            editTicket(ticket.tt_number)
                                        "
                                        >Edit</a
                                    >
                                    <a
                                        v-if="
                                            ticket.client_id == client.id &&
                                            ticket.assigned_to_user_id == null
                                        "
                                        onclick="confirm('Are you sure you want delete this Record?') || event.stopImmediatePropagation()"
                                        class="text-indigo-600 mr-2 hover:text-indigo-900 cursor-pointer"
                                        @click.stop="deleteTicket(ticket.id)"
                                    >
                                        Delete
                                    </a>
                                </td>
                                <td
                                    class="whitespace-nowrap text-center text-sm font-medium"
                                >
                                    <a
                                        v-if="ticket.client_id == client.id"
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
                                            @change="fetchTicket"
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
import {
    PlusIcon,
    ChatIcon,
    SearchIcon,
    FilterIcon,
    ExclamationIcon,
} from "@heroicons/vue/outline";
export default {
    components: {
        PlusIcon,
        ChatIcon,
        SearchIcon,
        FilterIcon,
        ExclamationIcon,
    },
    data() {
        return {
            search: "",
            loading: false,
            submission: false,
            show_alert: null,
            alert_message: null,
            tickets: [],
            statuses: [],
            notifications: [],
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
        client() {
            return JSON.parse(localStorage.getItem("client")) ?? null;
        },
        openTicket() {
            let sum = 0;
            this.tickets.forEach((obj) => {
                for (let property in obj) {
                    if (property == "status_id") {
                        if (obj[property] == 1) {
                            sum += 1;
                        }
                    }
                }
            });
            return sum;
        },
        disableSearchBtn() {
            return this.isNullOrEmpty(this.search);
        },
    },
    created() {
        this.fetchTicket();
    },
    methods: {
        clearFilter() {
            if (!this.disableSearchBtn) {
                this.search = "";
                this.fetchTicket();
            }
        },
        Filter() {
            if (!this.disableSearchBtn) this.fetchTicket();
        },
        postComment(slug) {
            this.$router.push({
                name: "client.tickets.comments",
                params: {
                    slug: slug,
                    prevPage: this.$router.currentRoute.value.name,
                },
            });
        },
        newTicket() {
            this.$router.push({ name: "client.tickets.new" });
        },
        editTicket(slug) {
            this.$router.push({
                name: "client.tickets.edit",
                params: { slug: slug },
            });
        },
        viewTicket(slug) {
            this.$router.push({
                name: "client.tickets.view",
                params: { slug: slug },
            });
        },
        fetchTicket() {
            this.loading = true;
            this.$store
                .dispatch("clientTicket/fetch", {
                    page: this.pagination.page,
                    per_page: this.pagination.per_page,
                    search: this.search,
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
        deleteTicket(id) {
            this.$store.dispatch("clientTicket/delete", id).then((response) => {
                if (response.data.success) {
                    this.show_alert = true;
                    this.alert_success_message = response.data.message;
                    this.fetchTicket();
                } else {
                    this.loading = false;
                    this.alert_error_message =
                        "Whoops, looks like something went wrong";
                }
                (error) => {
                    this.loading = false;
                    this.show_alert = true;
                    this.alert_error_message = error.response.data.message;
                };
            });
        },
        onChange(url) {
            let query = {
                url: url,
                search: this.search,
                per_page: this.pagination.per_page,
            };
            this.loading = true;
            this.$store.dispatch("clientTicket/paginate", query).then(
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
    },
};
</script>
