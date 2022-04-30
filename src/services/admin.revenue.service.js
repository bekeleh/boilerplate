import http from "./http-common";
import AuthHeader from "./admin.auth.header";

const END_POINT = "admin/notify_revenues/";

class AdminRevenueService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchRevenue(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchRevenueById(data) {
        return http.get(`${END_POINT}${data.clientId}`, {
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
        return http.put(`${END_POINT}${id}`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new AdminRevenueService();
