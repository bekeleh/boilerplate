import AdminUserService from "../../services/admin.user.service";

export const adminUser = {
    namespaced: true,
    state: {
        users: [],
    },
    getters: {
        getUsers: (state) => {
            return state.users;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminUserService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchUser({ commit }, data) {
            return AdminUserService.fetchUser(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchUserById({ commit }, user) {
            return AdminUserService.fetchUserById(user).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminUserService.create(data).then(
                (response) => {
                    // commit("userSuccess", response.data.user);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("userFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminUserService.update(id, data).then(
                (response) => {
                    // commit("userSuccess", response.data.user);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("userFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, user) {
            return AdminUserService.delete(user).then(
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
        userSuccess(state, user) {
            state.users = user;
        },
        userFailure(state) {
            state.users = null;
        },
    },
};
