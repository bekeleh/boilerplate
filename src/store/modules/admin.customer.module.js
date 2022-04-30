import AdminCustomerService from "../../services/admin.customer.service";

export const adminCustomer = {
    namespaced: true,
    state: {
        customers: [],
    },
    getters: {
        getCustomers: (state) => {
            return state.customers;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminCustomerService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCustomer({ commit }, data) {
            return AdminCustomerService.fetchCustomer(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchCustomerById({ commit }, customer) {
            return AdminCustomerService.fetchCustomerById(customer).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminCustomerService.create(data).then(
                (response) => {
                    // commit("customerSuccess", response.data.customer);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("customerFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminCustomerService.update(id, data).then(
                (response) => {
                    // commit("customerSuccess", response.data.customer);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("customerFailure");
                    return Promise.reject(error);
                }
            );
        },

        updateCustomer({ commit }, { id, data }) {
            return AdminCustomerService.updateCustomer(id, data).then(
                (response) => {
                    // commit("customerSuccess", response.data.customer);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("customerFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, customer) {
            return AdminCustomerService.delete(customer).then(
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
        customerSuccess(state, customer) {
            state.customers = customer;
        },
        customerFailure(state) {
            state.customers = null;
        },
    },
};
