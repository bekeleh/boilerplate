import AdminServiceService from "../../services/admin.service.service";

export const adminService = {
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
            return AdminServiceService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchService({ commit }, data) {
            return AdminServiceService.fetchService(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchServiceById({ commit }, service) {
            return AdminServiceService.fetchServiceById(service).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchServiceSection({ commit }, service) {
            return AdminServiceService.fetchServiceSection(service).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, service) {
            return AdminServiceService.create(service).then(
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
            return AdminServiceService.update(id, data).then(
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
            return AdminServiceService.delete(service).then(
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
