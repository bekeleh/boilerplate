import AdminRoleService from "../../services/admin.role.service";

export const adminRole = {
    namespaced: true,
    state: {
        roles: [],
    },
    getters: {
        getRoles: (state) => {
            return state.roles;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminRoleService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRole({ commit }, data) {
            return AdminRoleService.fetchRole(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRoleById({ commit }, role) {
            return AdminRoleService.fetchRoleById(role).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, role) {
            return AdminRoleService.create(role).then(
                (response) => {
                    // commit("roleSuccess", response.data.role);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("roleFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminRoleService.update(id, data).then(
                (response) => {
                    // commit("roleSuccess", response.data.role);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("roleFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, role) {
            return AdminRoleService.delete(role).then(
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
        roleSuccess(state, role) {
            state.roles = role;
        },
        roleFailure(state) {
            state.roles = null;
        },
    },
};
