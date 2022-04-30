import AdminWoredaService from "../../services/admin.woreda.service";

export const adminWoreda = {
    namespaced: true,
    state: {
        woredas: [],
    },
    getters: {
        getWoredas: (state) => {
            return state.woredas;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminWoredaService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchWoreda({ commit }, data) {
            return AdminWoredaService.fetchWoreda(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchWoredaById({ commit }, woreda) {
            return AdminWoredaService.fetchWoredaById(woreda).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, woreda) {
            return AdminWoredaService.create(woreda).then(
                (response) => {
                    // commit("woredaSuccess", response.data.woreda);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("woredaFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminWoredaService.update(id, data).then(
                (response) => {
                    // commit("woredaSuccess", response.data.woreda);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("woredaFailure");
                    return Promise.reject(error);
                }
            );
        },


        delete({ commit }, woreda) {
            return AdminWoredaService.delete(woreda).then(
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
        woredaSuccess(state, woreda) {
            state.woredas = woreda;
        },
        woredaFailure(state) {
            state.woredas = null;
        },
    },
};
