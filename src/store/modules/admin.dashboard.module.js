import AdminDashboardService from "../../services/admin.dashboard.service";

export const adminDashboard = {
    namespaced: true,
    state: {
        dashboards: [],
    },
    getters: {
        getDashboard: (state) => {
            return state.dashboards;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminDashboardService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchDashboard({ commit }, query) {
            return AdminDashboardService.fetchDashboard(query).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchDashboardById({ commit }, dashboard) {
            return AdminDashboardService.fetchDashboardById(dashboard).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, dashboard) {
            return AdminDashboardService.create(dashboard).then(
                (response) => {
                    // commit("dashboardSuccess", response.data.dashboard);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("dashboardFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminDashboardService.update(id, data).then(
                (response) => {
                    // commit("dashboardSuccess", response.data.dashboard);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("dashboardFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, dashboard) {
            return AdminDashboardService.delete(dashboard).then(
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
        dashboardSuccess(state, dashboard) {
            state.dashboards = dashboard;
        },
        dashboardFailure(state) {
            state.dashboards = null;
        },
    },
};
