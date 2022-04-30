import http from "./http-common";
import AuthHeader from "./admin.auth.header.js";

const END_POINT = "admin/requisitions/";

class AdminRequisitionService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchRequisition(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchRequisitionById(requisition) {
        return http.get(`${END_POINT}${requisition}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(requisition) {
        return http.post(`${END_POINT}`, requisition, {
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
}

export default new AdminRequisitionService();
