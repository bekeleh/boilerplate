import AdminUtilService from "../../services/admin.util.service";

export const adminUtil = {
    namespaced: true,
    state: {
        assingees: [],
    },
    getters: {
        getRoles: (state) => {
            return state.assingees;
        },
    },
    actions: {
        loadAssignees({ commit }, params) {
            return AdminUtilService.loadAssignees(params).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        createAssignee({ commit }, params) {
            return AdminUtilService.createAssignee(params).then(
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
        assigneeSuccess(state, assignee) {
            state.assingees = assignee;
        },
        assigneeFailure(state) {
            state.assingees = null;
        },
    },
};
