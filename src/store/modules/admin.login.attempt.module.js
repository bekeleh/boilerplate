import AdminLoginAttemptService from "../../services/admin.login.attempt.service";

export const adminLoginAttempt = {
    namespaced: true,
    state: {
        login_attempt: [],
    },
    getters: {
        getLoginAttempts: (state) => {
            return state.login_attempt;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminLoginAttemptService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchLoginAttempt({ commit }, data) {
            return AdminLoginAttemptService.fetchLoginAttempt(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchLoginAttemptSection({ commit }, data) {
            return AdminLoginAttemptService.fetchLoginAttemptSection(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchLoginAttemptById({ commit }, id) {
            return AdminLoginAttemptService.fetchLoginAttemptById(id).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, LoginAttempt) {
            return AdminLoginAttemptService.create(LoginAttempt).then(
                (response) => {
                    // commit("LoginAttemptSuccess", response.data.LoginAttempt);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("LoginAttemptFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminLoginAttemptService.update(id, data).then(
                (response) => {
                    // commit("LoginAttemptSuccess", response.data.LoginAttempt);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("LoginAttemptFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, id) {
            return AdminLoginAttemptService.delete(id).then(
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
        LoginAttemptSuccess(state, payload) {
            state.login_attempt = payload;
        },
        LoginAttemptFailure(state) {
            state.login_attempt = null;
        },
    },
};
