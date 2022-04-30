import http from "./http-common";
import AuthHeader from "./client.auth.header";

const END_POINT = "client/comments/";

class ClientCommentService {
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
            `${END_POINT}?page=${data.page}&per_page=${data.per_page}`,
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

export default new ClientCommentService();
