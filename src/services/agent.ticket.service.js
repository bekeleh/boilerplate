import http from "./http-common";
import AuthHeader from "./agent.auth.header.js";

const END_POINT = "agent/tickets/";

class AgentTicketService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchTicket(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchTicketById(data) {
        return http.get(`${END_POINT}${data.slug}`, {
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

    downloadAttachment(ticket) {
        return http.get(`${END_POINT}download_attachment/${ticket}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    documentVerification(data) {
        return http.post(`${END_POINT}tickets_document_verification/`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    removeAttachment(ticket) {
        return http.delete(`${END_POINT}remove_attachment/${ticket}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new AgentTicketService();
