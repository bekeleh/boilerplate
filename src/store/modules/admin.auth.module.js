import AdminAuthService from "../../services/admin.auth.service";

const user =
    localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : null;

const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

export const adminAuth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit, dispatch, rootState, rootGetters }, user) {
            return AdminAuthService.login(user).then(
                (response) => {
                    if (response.data && response.data.success) {
                        localStorage.setItem(
                            "user",
                            JSON.stringify(response.data.user)
                        );
                        localStorage.setItem("userToken", response.data.token);
                        commit("loginSuccess", response.data.user);
                        dispatch(
                            "authorize/defineAbility",
                            response.data.user.permissions,
                            { root: true }
                        );
                        // const ability = rootGetters["authorize/ability"];
                        // ability.update(rootState.authorize.rules);
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
            return AdminAuthService.logout().then(
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
        register({ commit }, user) {
            return AdminAuthService.register(user).then(
                (response) => {
                    commit("registerSuccess");
                    return Promise.resolve(response);
                },
                (error) => {
                    commit("registerFailure");
                    return Promise.reject(error);
                }
            );
        },

        fetchProfile({ commit }) {
            return AdminAuthService.fetchProfile().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        updateProfile({ commit }, data) {
            return AdminAuthService.updateProfile(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        changePassword({ commit }, data) {
            return AdminAuthService.changePassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        emailResend({ commit }) {
            return AdminAuthService.emailResend().then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        forgotPassword({ commit }, data) {
            return AdminAuthService.forgotPassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        resetPassword({ commit }, data) {
            return AdminAuthService.resetPassword(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        checkToken({dispatch}){
            return AdminAuthService.checkToken()
                .then((res) => {
                    return Promise.resolve(res)
                },
                (err) =>{
                    dispatch('logout')
                    Promise.reject(err)
                })
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("userToken");
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
    },
};
