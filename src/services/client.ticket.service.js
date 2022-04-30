import http from "./http-common";
import AuthHeader from "./client.auth.header";

const END_POINT = "client/tickets/";

class ClientTicketService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetch(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
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

export default new ClientTicketService();
