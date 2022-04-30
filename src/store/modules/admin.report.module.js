import AdminReportService from "../../services/admin.report.service";

export const adminReport = {
    namespaced: true,
    state: {
        reports: [],
    },
    getters: {
        getReport: (state) => {
            return state.reports;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminReportService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchReport({ commit }, query) {
            return AdminReportService.fetchReport(query).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchReportById({ commit }, report) {
            return AdminReportService.fetchReportById(report).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, report) {
            return AdminReportService.create(report).then(
                (response) => {
                    // commit("reportSuccess", response.data.report);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("reportFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminReportService.update(id, data).then(
                (response) => {
                    // commit("reportSuccess", response.data.report);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("reportFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, report) {
            return AdminReportService.delete(report).then(
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
        reportSuccess(state, report) {
            state.reports = report;
        },
        reportFailure(state) {
            state.reports = null;
        },
    },
};
