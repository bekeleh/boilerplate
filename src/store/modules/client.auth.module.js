import ClientAuthService from "../../services/client.auth.service";

const client =
    localStorage.getItem("client") !== "undefined"
        ? JSON.parse(localStorage.getItem("client"))
        : null;

const initialState = client
    ? { status: { loggedIn: true }, client }
    : { status: { loggedIn: false }, client: null };

export const clientAuth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, data) {
            return ClientAuthService.login(data).then(
                (response) => {
                    if (response.data && response.data.success) {
                        localStorage.setItem(
                            "client",
                            JSON.stringify(response.data.client)
                        );
                        localStorage.setItem(
                            "clientToken",
                            response.data.token
                        );
                        commit("loginSuccess", response.data.client);
                    }
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("loginFailure");
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            return ClientAuthService.logout().then(
                (response) => {
                    commit("logout");
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("logout");
                    return Promise.reject(error);
                }
            );
        },

        register({ commit }, client) {
            return ClientAuthService.register(client).then(
                (response) => {
                    // if (response.data && response.data.success) {
                    //     localStorage.setItem(
                    //         "client",
                    //         JSON.stringify(response.data.client)
                    //     );
                    //     localStorage.setItem("clientToken", response.data.token);
                    //     commit("registerSuccess");
                    // }
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },

        fetchProfile({ commit }) {
            return ClientAuthService.fetchProfile().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        updateProfile({ commit }, data) {
            return ClientAuthService.updateProfile(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        changePassword({ commit }, data) {
            return ClientAuthService.changePassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        emailResend({ commit }) {
            return ClientAuthService.emailResend().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        forgotPassword({ commit }, data) {
            return ClientAuthService.forgotPassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        activationCode({ commit }, data) {
            return ClientAuthService.activationCode(data).then(
                (response) => {
                    // if (response.data && response.data.success) {
                    //     localStorage.setItem(
                    //         "client",
                    //         JSON.stringify(response.data.client)
                    //     );
                    //     localStorage.setItem("clientToken", response.data.token);
                    //     commit("registerSuccess");
                    // }
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        forgotPasswordCode({ commit }, data) {
            return ClientAuthService.forgotPasswordCode(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        resetPassword({ commit }, data) {
            return ClientAuthService.resetPassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        checkToken({ dispatch }) {
            return ClientAuthService.checkToken().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    dispatch("logout");
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        loginSuccess(state, client) {
            state.status.loggedIn = true;
            state.client = client;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.client = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.client = null;
            localStorage.removeItem("client");
            localStorage.removeItem("clientToken");
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
};
