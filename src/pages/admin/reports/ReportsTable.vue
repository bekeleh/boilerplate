<template>
    <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-0 my-6">
            <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-2"
            >
                <div
                    class="shadow-md overflow-hidden border border-gray-200 sm:rounded-lg"
                >
                    <!-- Sidebar Search -->
                    <div
                        class="md:flex items-center justify-center p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div
                            v-if="can('export', 'report')"
                            class="md:flex items-center justify-start"
                        >
                            <div>
                                <select
                                    id="extension"
                                    v-model="extension"
                                    name="status"
                                    class="block m-1 text-base border-gray-300 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm rounded-md"
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
                                    :disabled="reports.length == 0"
                                    :class="[
                                        reports.length == 0
                                            ? 'bg-gray-400 order-0 cursor-default '
                                            : '  hover:bg-et-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-et-green bg-et-green-light ',
                                        'inline-flex m-1 sm:order-1 sm:ml-3 pr-4 pl-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white',
                                    ]"
                                    @click="
                                        exportToCsv(
                                            reports,
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
                        class="md:flex items-center justify-center p-2 lg:max-w-6xl lg:mx-auto"
                    >
                        <div class="md:flex items-center justify-start">
                            <div>
                                <select
                                    id="selected"
                                    v-model="status"
                                    name="selected"
                                    class="block m-2 text-base border-gray-300 focus:outline-none focus:ring-et-green-light focus:border-et-green-light sm:text-sm rounded-md"
                                >
                                    <option selected disabled>
                                        Please select
                                    </option>
                                    <option
                                        v-for="(status, statusIdx) in statuses"
                                        :key="statusIdx"
                                        :value="status"
                                    >
                                        {{ status }}
                                    </option>
                                </select>
                            </div>
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
                                        @keyup.enter="fetchTicket"
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
                                @click="fetchTicket"
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
                                    Ticket number
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
                                    Client Name
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
                                    Current handler
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
                            </tr>
                        </thead>
                        <tbody v-if="reports.length">
                            <tr
                                v-for="(report, reportIdx) in reports"
                                :key="reportIdx"
                                :class="
                                    reportIdx % 2 === 0
                                        ? 'bg-white'
                                        : 'bg-gray-50'
                                "
                                class="hover:text-et-green hover:bg-indigo-200"
                            >
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.tt_number }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.company_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.client_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.phone }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.service_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.category_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.status_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.region_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.zone_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-500"
                                >
                                    {{ report.woreda_name }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ report.location }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ report.building }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ report.assigned_to }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ report.current_handler }}
                                </td>
                                <td
                                    class="px-3 py-2 whitespace-nowrap text-sm text-gray-500"
                                >
                                    {{ report.created_at }}
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { FilterIcon, SearchIcon } from "@heroicons/vue/outline";

export default {
    components: { FilterIcon, SearchIcon },
    setup() {
        const loading = ref("");
        const store = useStore();
        const router = useRouter;
        const { can } = useAbility();
        const reports = ref([]);
        const search = ref("");
        const status = ref("");
        const selected = ref("created_at");
        const date_from = ref("");
        const date_to = ref("");
        const date_to_time = ref("");
        const pageList = ref([10, 20, 30, 50, 100, 150, 200, 500, 1000]);
        const prefix = "general_report";
        const fields = ref([
            "created_at",
            "updated_at",
            "escalated_at",
            "rejected_at",
            "closed_at",
        ]);
        const statuses = ref([
            "Open",
            "On progress",
            "Completed",
            "Closed",
            "Rejected",
        ]);
        const extension = ref(".csv");
        const exts = ref([
            { name: "excel", format: ".xlsx" },
            { name: "csv", format: ".csv" },
        ]);
        const export_fields = [
            {
                label: "Ticket number",
                value: "tt_number",
            },
            {
                label: "Company name",
                value: "company_name",
            },
            {
                label: "Full name",
                value: "client_name",
            },
            {
                label: "E-mail",
                value: "email",
            },
            {
                label: "Mobile number",
                value: "phone",
            },
            {
                label: "Location",
                value: "location",
            },
            {
                label: "Building",
                value: "building",
            },
            {
                label: "Service name",
                value: "service_name",
            },
            {
                label: "Category name",
                value: "category_name",
            },
            {
                label: "Doc status",
                value: "document_status",
            },
            {
                label: "Status",
                value: "status_name",
            },
            {
                label: "Priority",
                value: "priority_name",
            },
            {
                label: "Region name",
                value: "region_name",
            },
            {
                label: "Zone name",
                value: "zone_name",
            },
            {
                label: "Woreda name",
                value: "woreda_name",
            },
            {
                label: "Assigned to",
                value: "assigned_to",
            },
            {
                label: "Current handler",
                value: "current_handler",
            },
            {
                label: "Created at",
                value: "created_at",
            },
            {
                label: "Updated at",
                value: "updated_at",
            },
            {
                label: "Escalated at",
                value: "escalated_at",
            },
            {
                label: "Rejected at",
                value: "rejected_at",
            },
            {
                label: "Closed at",
                value: "closed_at",
            },
        ];
        const disableSearchBtn = computed(() => {
            return (
                search.value == null &&
                date_from.value == null &&
                date_to.value == null
            );
        });
        onMounted(fetchTicket);

        function clearFilter() {
            reports.value = [];
            selected.value = "";
            extension.value = "";
            search.value = "";
            status.value = "";
            date_from.value = "";
            date_to.value = "";
            date_to_time.value = "";
        }

        function getReport() {
            let query = {
                search: search.value,
                selected: selected.value,
                status: status.value,
                dateFrom: date_from.value,
                dateTo: date_to.value,
                dateToTime: date_to_time.value,
            };
            store
                .dispatch("adminReport/fetchReport", query)
                .then((response) => {
                    reports.value = response.data.data;
                });
        }

        function fetchTicket() {
            let data = {
                per_page: pagination.value.per_page,
                search: search.value,
                selected: selected.value,
                status: status.value,
                dateFrom: date_from.value,
                dateTo: date_to.value,
                dateToTime: date_to_time.value,
            };
            loading.value = true;
            store.dispatch("adminReport/fetchReport", data).then(
                (response) => {
                    loading.value = false;
                    if (response.data) {
                        reports.value = response.data.data;
                        pagination.value.links = response.data.links;
                        pagination.value.current_page =
                            response.data.current_page;
                        pagination.value.total = response.data.total;
                        pagination.value.from = response.data.from;
                        pagination.value.to = response.data.to;
                        pagination.value.per_page = response.data.per_page;
                        pagination.value.prev_page_url =
                            response.data.prev_page_url;
                        pagination.value.next_page_url =
                            response.data.next_page_url;
                    } else {
                        loading.value = false;
                    }
                },
                (error) => {
                    loading.value = false;
                }
            );
        }
        function viewTicket(slug) {
            router.push({
                name: "admin.reports.view",
                params: { slug: slug },
            });
        }

        function onChange(url) {
            let query = {
                url: url,
                per_page: pagination.value.per_page,
                search: search.value,
                selected: selected.value,
                status: status.value,
                dateFrom: date_from.value,
                dateTo: date_to.value,
                dateToTime: date_to_time.value,
            };
            loading.value = true;
            store.dispatch("adminReport/paginate", query).then(
                (response) => {
                    reports.value = response.data.data;
                    pagination.value.links = response.data.links;
                    pagination.value.current_page = response.data.current_page;
                    pagination.value.total = response.data.total;
                    pagination.value.from = response.data.from;
                    pagination.value.to = response.data.to;
                    pagination.value.per_page = response.data.per_page;
                    pagination.value.prev_page_url =
                        response.data.prev_page_url;
                    pagination.value.next_page_url =
                        response.data.next_page_url;
                },
                (error) => {}
            );
        }

        const pagination = ref({
            first_page_url: null,
            next_page_url: null,
            last_page_url: null,
            prev_page_url: null,
            last_page: null,
            from: null,
            to: null,
            total: null,
            path: null,
            per_page: 10,
            links: {},
            current_page: 1,
        });
        return {
            prefix,
            clearFilter,
            export_fields,
            fields,
            statuses,
            extension,
            status,
            can,
            exts,
            alert_success_message: null,
            alert_error_message: null,
            loading: false,
            search,
            selected,
            reports,
            pagination,
            viewTicket,
            fetchTicket,
            onChange,
            disableSearchBtn,
            date_from,
            date_to,
            date_to_time,
            getReport,
            pageList,
        };
    },
};
</script>
