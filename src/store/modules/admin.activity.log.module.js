import AdminActivitylogService from "../../services/admin.activity.log.service";

export const adminActivitylog = {
    namespaced: true,
    state: {
        activity_log: [],
    },
    getters: {
        getActivitylogs: (state) => {
            return state.activity_log;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminActivitylogService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchActivitylog({ commit }, data) {
            return AdminActivitylogService.fetchActivitylog(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchActivitylogSection({ commit }, data) {
            return AdminActivitylogService.fetchActivitylogSection(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchActivitylogById({ commit }, id) {
            return AdminActivitylogService.fetchActivitylogById(id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, Activitylog) {
            return AdminActivitylogService.create(Activitylog).then(
                (response) => {
                    // commit("ActivitylogSuccess", response.data.Activitylog);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("ActivitylogFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminActivitylogService.update(id, data).then(
                (response) => {
                    // commit("ActivitylogSuccess", response.data.Activitylog);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("ActivitylogFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, id) {
            return AdminActivitylogService.delete(id).then(
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
        ActivitylogSuccess(state, payload) {
            state.activity_log = payload;
        },
        ActivitylogFailure(state) {
            state.activity_log = null;
        },
    },
};
