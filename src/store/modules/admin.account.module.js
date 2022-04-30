import AdminAccountService from "../../services/admin.account.service";

export const adminAccount = {
    namespaced: true,
    state: {
        accounts: [],
    },
    getters: {
        getAccounts: (state) => {
            return state.accounts;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminAccountService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchAccount({ commit }, data) {
            return AdminAccountService.fetchAccount(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchAccountById({ commit }, account) {
            return AdminAccountService.fetchAccountById(account).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminAccountService.create(data).then(
                (response) => {
                    // commit("accountSuccess", response.data.account);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("accountFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminAccountService.update(id, data).then(
                (response) => {
                    // commit("accountSuccess", response.data.account);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("accountFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, account) {
            return AdminAccountService.delete(account).then(
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
        accountSuccess(state, account) {
            state.accounts = account;
        },
        accountFailure(state) {
            state.accounts = null;
        },
    },
};
