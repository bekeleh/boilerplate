import AdminStatusService from "../../services/admin.status.service";

export const adminStatus = {
    namespaced: true,
    state: {
        statuses: [],
    },
    getters: {
        getStatuses: (state) => {
            return state.statuses;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminStatusService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchStatus({ commit }, data) {
            return AdminStatusService.fetchStatus(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchStatusById({ commit }, status) {
            return AdminStatusService.fetchStatusById(status).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, status) {
            return AdminStatusService.create(status).then(
                (response) => {
                    // commit("statusSuccess", response.data.status);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("statusFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminStatusService.update(id, data).then(
                (response) => {
                    // commit("statusSuccess", response.data.status);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("statusFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, status) {
            return AdminStatusService.delete(status).then(
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
        statusSuccess(state, status) {
            state.statuses = status;
        },
        statusFailure(state) {
            state.statuses = null;
        },
    },
};
