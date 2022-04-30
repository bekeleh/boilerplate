import AdminCategoryService from "../../services/admin.category.service";

export const adminCategory = {
    namespaced: true,
    state: {
        categories: [],
    },
    getters: {
        getCategory: (state) => {
            return state.categories;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminCategoryService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCategory({ commit }, data) {
            return AdminCategoryService.fetchCategory(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCategoryById({ commit }, category) {
            return AdminCategoryService.fetchCategoryById(category).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, category) {
            return AdminCategoryService.create(category).then(
                (response) => {
                    // commit("categorySuccess", response.data.category);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("categoryFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminCategoryService.update(id, data).then(
                (response) => {
                    // commit("categorySuccess", response.data.category);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("categoryFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, category) {
            return AdminCategoryService.delete(category).then(
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
        categorySuccess(state, category) {
            state.categories = category;
        },
        categoryFailure(state) {
            state.categories = null;
        },
    },
};
