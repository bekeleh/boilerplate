import http from "./http-common";
import AuthHeader from "./client.auth.header";

const END_POINT = "client/read_revenues/";

class ClientRevenueService {
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
        return http.get(`${END_POINT}${data.id}`, {
            // params: {
            //     id: data.id,
            // },
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    create(data) {
        return http.post(`${END_POINT}`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }

    update(id, data) {
        return http.put(`${END_POINT}${id}`, data, {
            headers: { Authorization: "Bearer " + AuthHeader() },
        });
    }
}

export default new ClientRevenueService();
