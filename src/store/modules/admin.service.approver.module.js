import AdminServiceApprover from "../../services/admin.service.approver.service";

export const adminServiceApprover = {
    namespaced: true,
    state: {
        services: [],
    },
    getters: {
        getServices: (state) => {
            return state.services;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminServiceApprover.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchServiceApprover({ commit }, data) {
            return AdminServiceApprover.fetchServiceApprover(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchServiceApproverById({ commit }, data) {
            return AdminServiceApprover.fetchServiceApproverById(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchServiceApproverSection({ commit }, data) {
            return AdminServiceApprover.fetchServiceApproverSection(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminServiceApprover.create(data).then(
                (response) => {
                    // commit("serviceSuccess", response.data.service);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("serviceFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminServiceApprover.update(id, data).then(
                (response) => {
                    // commit("serviceSuccess", response.data.service);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("serviceFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, service) {
            return AdminServiceApprover.delete(service).then(
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
        serviceSuccess(state, service) {
            state.services = service;
        },
        serviceFailure(state) {
            state.services = null;
        },
    },
};
