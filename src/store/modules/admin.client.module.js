import AdminClientService from "../../services/admin.client.service";

export const adminClient = {
    namespaced: true,
    state: {
        clients: [],
    },
    getters: {
        getClients: (state) => {
            return state.clients;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminClientService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchClient({ commit }, data) {
            return AdminClientService.fetchClient(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchClientById({ commit }, client) {
            return AdminClientService.fetchClientById(client).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminClientService.create(data).then(
                (response) => {
                    // commit("clientSuccess", response.data.client);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("clientFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminClientService.update(id, data).then(
                (response) => {
                    // commit("clientSuccess", response.data.client);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("clientFailure");
                    return Promise.reject(error);
                }
            );
        },

        updateClient({ commit }, { id, data }) {
            return AdminClientService.updateClient(id, data).then(
                (response) => {
                    // commit("clientSuccess", response.data.client);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("clientFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, client) {
            return AdminClientService.delete(client).then(
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
        clientSuccess(state, client) {
            state.clients = client;
        },
        clientFailure(state) {
            state.clients = null;
        },
    },
};
