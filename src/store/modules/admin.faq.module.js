import AdminFaqService from "../../services/admin.faq.service";

export const adminFaq = {
    namespaced: true,
    state: {
        faqs: [],
    },
    getters: {
        getFaqs: (state) => {
            return state.faqs;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminFaqService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchFaq({ commit }, data) {
            return AdminFaqService.fetchFaq(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchFaqSection({ commit }, data) {
            return AdminFaqService.fetchFaqSection(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchFaqById({ commit }, Faq) {
            return AdminFaqService.fetchFaqById(Faq).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminFaqService.create(data).then(
                (response) => {
                    // commit("FaqSuccess", response.data.Faq);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("FaqFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminFaqService.update(id, data).then(
                (response) => {
                    // commit("FaqSuccess", response.data.Faq);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("FaqFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, id) {
            return AdminFaqService.delete(id).then(
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
        FaqSuccess(state, Faq) {
            state.faqs = Faq;
        },
        FaqFailure(state) {
            state.faqs = null;
        },
    },
};
