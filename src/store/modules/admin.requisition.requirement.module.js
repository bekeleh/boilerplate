import AdminRequisitionRequirementService from "../../services/admin.requisition.requirement.service";

export const adminRequisitionRequirement = {
    namespaced: true,
    state: {
        requisitions: [],
    },
    getters: {
        getRequisitionRequirements: (state) => {
            return state.requisitions;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminRequisitionRequirementService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequisitionRequirement({ commit }, data) {
            return AdminRequisitionRequirementService.fetchRequisitionRequirement(
                data
            ).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequisitionRequirementById({ commit }, requisition) {
            return AdminRequisitionRequirementService.fetchRequisitionRequirementById(
                requisition
            ).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, requisition) {
            return AdminRequisitionRequirementService.create(requisition).then(
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
            return AdminRequisitionRequirementService.update(id, data).then(
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
            return AdminRequisitionRequirementService.delete(requisition).then(
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
