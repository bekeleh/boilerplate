import http from "./http-common";
import AuthHeader from "./admin.auth.header.js";

const END_POINT = "admin/regions/";

class AdminRegionService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchRegion(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchRegionById(region) {
        return http.get(`${END_POINT}${region}`, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(region) {
        return http.post(`${END_POINT}`, region, {
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

export default new AdminRegionService();
