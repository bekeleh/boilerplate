import http from "./http-common";
import AuthHeader from "./admin.auth.header";

const END_POINT = "admin/comments/";

class AdminCommentService {
    paginate(data) {
        return http.get(
            `${data.url}&per_page=${data.per_page}&search=${data.search}`,
            {
                headers: { Authorization: "Bearer " + AuthHeader() },
            }
        );
    }

    fetchComment(data) {
        return http.get(
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}&search=${data.search}`,
            { headers: { Authorization: "Bearer " + AuthHeader() } }
        );
    }

    fetchCommentById(data) {
        return http.get(`${END_POINT}${data.slug}`, {
            params: {
                id: data.id,
            },
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

export default new AdminCommentService();
