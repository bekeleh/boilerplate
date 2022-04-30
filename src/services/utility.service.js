import http from "./http-common";
import AuthHeader from "./admin.auth.header";
import { APISettings } from "./APISettings";

const END_POINT = "admin/assignee_options/";

class UtilityService {
    index() {
        return fetch(APISettings.baseURL + "/brew-methods", {
            method: "GET",
            headers: APISettings.headers,
        }).then(function (response) {
            if (response.status != 200) {
                throw response.status;
            } else {
                return response.json();
            }
        });
    }

    store(data) {
        APISettings.headers.set("Content-Type", "multipart/form-data");
        APISettings.headers.set("Authorization", "Bearer " + APISettings.token);

        return fetch(APISettings.baseURL + "/brew-methods", {
            method: "POST",
            headers: APISettings.headers,
            body: data,
        }).then(function (response) {
            if (response.status != 201) {
                throw response.status;
            } else {
                return response.json();
            }
        });
    }

    fetchAssignee(search) {
        return http.get(`${END_POINT}${search}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new UtilityService();
