import http from "./http-common";
import AuthHeader from "./admin.auth.header";

const END_POINT = "admin/dashboards/";

class AdminDashboardService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchDashboard(query) {
        return http.get(
            `${END_POINT}?search=${query.search}&dateFrom=${query.dateFrom}&dateTo=${query.dateTo}&dateToTime=${query.dateToTime}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchDashboardById(dashboard) {
        return http.get(`${END_POINT}${dashboard}`, {
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
}

export default new AdminDashboardService();
