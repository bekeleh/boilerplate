import AdminRequisitionService from "../../services/admin.requisition.service";

export const adminRequisition = {
    namespaced: true,
    state: {
        requisitions: [],
    },
    getters: {
        getRequisitions: (state) => {
            return state.requisitions;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminRequisitionService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequisition({ commit }, data) {
            return AdminRequisitionService.fetchRequisition(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequisitionById({ commit }, requisition) {
            return AdminRequisitionService.fetchRequisitionById(requisition).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, requisition) {
            return AdminRequisitionService.create(requisition).then(
                (response) => {
                    // commit("requisitionSuccess", response.data.requisition);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("requisitionFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminRequisitionService.update(id, data).then(
                (response) => {
                    // commit("requisitionSuccess", response.data.requisition);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("requisitionFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, requisition) {
            return AdminRequisitionService.delete(requisition).then(
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
        requisitionSuccess(state, requisition) {
            state.requisitions = requisition;
        },
        requisitionFailure(state) {
            state.requisitions = null;
        },
    },
};
