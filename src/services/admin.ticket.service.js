import http from "./http-common";
import AuthHeader from "./admin.auth.header";

const END_POINT = "admin/tickets/";

class AdminTicketService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    paginateRecent(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    paginateAssigned(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    paginateMy(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    paginateClosed(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchTicket(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchMyTicket(data) {
        return http.get(
            `${END_POINT}my_tickets?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchSearchTicket(data) {
        return http.get(
            `${END_POINT}search_tickets?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    SearchTicketById(data) {
        return http.get(`${END_POINT}search_tickets/${data.slug}`, {
            params: {
                id: data.id,
            },
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    fetchApproveTicket(data) {
        return http.get(
            `${END_POINT}approve?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchAssignedTicket(data) {
        return http.get(
            `${END_POINT}assigned?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchClosedTicket(data) {
        return http.get(
            `${END_POINT}closed?page=${data.page}&per_page=${data.per_page}&filter=${data.filter}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchTicketById(data) {
        return http.get(`${END_POINT}${data.slug}`, {
            params: {
                id: data.id,
            },
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(data) {
        return http.post(`${END_POINT}`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
    }

    update(id, data) {
        return http.post(`${END_POINT}update/${id}`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        });
    }

    delete(id) {
        return http.delete(`${END_POINT}${id}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    assign(data) {
        return http.post(`${END_POINT}assign/`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    approve(data) {
        return http.post(`${END_POINT}approve/`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    downloadAttachment(name) {
        return http({
            url: `${END_POINT}download_attachment/${name}`,
            method: "GET",
            responseType: "blob",
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    removeAttachment(ticket) {
        return http.delete(`${END_POINT}remove_attachment/${ticket}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new AdminTicketService();
