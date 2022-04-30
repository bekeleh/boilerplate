import AdminPriorityService from "../../services/admin.priority.service";

export const adminPriority = {
    namespaced: true,
    state: {
        priorities: [],
    },
    getters: {
        getPriorityes: (state) => {
            return state.priorities;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminPriorityService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchPriority({ commit }, data) {
            return AdminPriorityService.fetchPriority(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchPriorityById({ commit }, id) {
            return AdminPriorityService.fetchPriorityById(id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminPriorityService.create(data).then(
                (response) => {
                    // commit("prioritySuccess", response.data.priority);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("priorityFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminPriorityService.update(id, data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, id) {
            return AdminPriorityService.delete(id).then(
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
        prioritySuccess(state, payload) {
            state.priorities = payload;
        },
        priorityFailure(state) {
            state.priorities = null;
        },
    },
};
