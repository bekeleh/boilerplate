import ClientRevenueService from "../../services/client.revenue.service";

export const clientRevenue = {
    namespaced: true,
    state: {
        revenues: [],
    },
    getters: {
        getRevenues: (state) => {
            return state.revenues;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return ClientRevenueService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRevenue({ commit }, data) {
            return ClientRevenueService.fetchRevenue(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRevenueById({ commit }, data) {
            return ClientRevenueService.fetchRevenueById(data).then(
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

        create({ commit }, data) {
            return ClientRevenueService.create(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return ClientRevenueService.update(id, data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, data) {
            return ClientRevenueService.delete(data).then(
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
        COMMENT(state, payload) {
            state.revenues = payload;
        },
    },
};
