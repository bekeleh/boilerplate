import AdminRevenueService from "../../services/admin.revenue.service";

export const adminRevenue = {
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
            return AdminRevenueService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRevenue({ commit }, data) {
            return AdminRevenueService.fetchRevenue(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRevenueById({ commit }, data) {
            return AdminRevenueService.fetchRevenueById(data).then(
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

        create({ commit }, data) {
            return AdminRevenueService.create(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminRevenueService.update(id, data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, data) {
            return AdminRevenueService.delete(data).then(
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
