import ClientCommentService from "../../services/client.comment.service";

export const clientComment = {
    namespaced: true,
    state: {
        comments: [],
    },
    getters: {
        getComments: (state) => {
            return state.comments;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return ClientCommentService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchComment({ commit }, data) {
            return ClientCommentService.fetchComment(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCommentById({ commit }, data) {
            return ClientCommentService.fetchCommentById(data).then(
                (response) => {
                    commit("clientNotification/removeNotification", data.id, {
                        root: true,
                    });
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, comment) {
            return ClientCommentService.create(comment).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return ClientCommentService.update(id, data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, comment) {
            return ClientCommentService.delete(comment).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        COMMENT(state, comment) {
            state.comments = comment;
        },
    },
};
