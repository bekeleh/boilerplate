import AdminCommentService from "../../services/admin.comment.service";

export const adminComment = {
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
            return AdminCommentService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchComment({ commit }, data) {
            return AdminCommentService.fetchComment(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCommentById({ commit }, data) {
            return AdminCommentService.fetchCommentById(data).then(
                (response) => {
                    commit("adminNotification/removeNotification", data.id, {
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
            return AdminCommentService.create(comment).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminCommentService.update(id, data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, comment) {
            return AdminCommentService.delete(comment).then(
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
