import http from "./http-common";
import AuthHeader from "./client.auth.header";

const END_POINT = "client/notifications/";

class ClientNotificationService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchNotification() {
        return http.get(`${END_POINT}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    fetchNotificationById(notification) {
        return http.get(`${END_POINT}${notification}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(data) {
        return http.post(`${END_POINT}`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    update(id, data) {
        return http.put(`${END_POINT}${id}`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    delete(id) {
        return http.delete(`${END_POINT}${id}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    markUsRead() {
        return http.get(`client/mark_us_read`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new ClientNotificationService();
