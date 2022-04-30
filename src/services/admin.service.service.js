import http from "./http-common";
import AuthHeader from "./admin.auth.header.js";

const END_POINT = "admin/services/";

class AdminServiceService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchService(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchServiceById(service) {
        return http.get(`${END_POINT}${service}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(service) {
        return http.post(`${END_POINT}`, service, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    update(id, data) {
        return http.put(`${END_POINT}${id}`, data, {
            headers: {
                Authorization: "Bearer " + AuthHeader(),
            },
        });
    }

    delete(id) {
        return http.delete(`${END_POINT}${id}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    fetchServiceSection(data) {
        return http.get(
            `${END_POINT}service_options?page=${data.page}&per_page=${data.per_page}`
        );
    }
}

export default new AdminServiceService();
