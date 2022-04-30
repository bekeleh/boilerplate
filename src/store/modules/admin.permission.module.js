import AdminPermissionService from "../../services/admin.permission.service";

export const adminPermission = {
    namespaced: true,
    state: {
        permissions: [],
    },
    getters: {
        getPermissions: (state) => {
            return state.permissions;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminPermissionService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchPermission({ commit }, data) {
            return AdminPermissionService.fetchPermission(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchPermissionById({ commit }, id) {
            return AdminPermissionService.fetchPermissionById(id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminPermissionService.create(data).then(
                (response) => {
                    // commit("permissionSuccess", response.data.permission);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("permissionFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminPermissionService.update(id, data).then(
                (response) => {
                    // commit("permissionSuccess", response.data.permission);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("permissionFailure");
                    return Promise.reject(error);
                }
            );
        },


        delete({ commit }, id) {
            return AdminPermissionService.delete(id).then(
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
        permissionSuccess(state, payload) {
            state.permissions = payload;
        },
        permissionFailure(state) {
            state.permissions = null;
        },
    },
};
