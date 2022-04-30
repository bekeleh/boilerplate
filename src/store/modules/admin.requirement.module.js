import AdminRequirementService from "../../services/admin.requirement.service";

export const adminRequirement = {
    namespaced: true,
    state: {
        requirements: [],
    },
    getters: {
        getRequirements: (state) => {
            return state.requirements;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminRequirementService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequirement({ commit }, data) {
            return AdminRequirementService.fetchRequirement(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRequirementById({ commit }, requirement) {
            return AdminRequirementService.fetchRequirementById(
                requirement
            ).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, requirement) {
            return AdminRequirementService.create(requirement).then(
                (response) => {
                    // commit("requirementSuccess", response.data.requirement);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("requirementFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminRequirementService.update(id, data).then(
                (response) => {
                    // commit("requirementSuccess", response.data.requirement);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("requirementFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, requirement) {
            return AdminRequirementService.delete(requirement).then(
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
        requirementSuccess(state, requirement) {
            state.requirements = requirement;
        },
        requirementFailure(state) {
            state.requirements = null;
        },
    },
};
