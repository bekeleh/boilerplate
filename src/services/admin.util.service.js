import http from "./http-common";
import AuthHeader from "./admin.auth.header.js";

const END_POINT = "admin/assignee_options/"

class AdminUtilService {
    loadAssignees(params) {
        return http.get(`${END_POINT}${params.search}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    createAssignee(params) {
        return http.post(`${END_POINT}${params.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }
}

export default new AdminUtilService();
