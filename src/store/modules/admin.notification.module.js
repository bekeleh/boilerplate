import AdminNotificationService from "../../services/admin.notification.service";

export const adminNotification = {
    namespaced: true,
    state: {
        notifications: [],
    },
    getters: {
        getNotifications: (state) => {
            return state.notifications;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminNotificationService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchNotification({ commit }, data) {
            return AdminNotificationService.fetchNotification(data).then(
                (response) => {
                    if (response.data.success) {
                        commit("AddNotification", response.data.data);
                    }
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        markUsRead({ commit }) {
            return AdminNotificationService.markUsRead().then(
                (response) => {
                    if (response.data.success) {
                        commit("clearNotification");
                    }
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchNotificationById({ commit }, id) {
            return AdminNotificationService.fetchNotificationById( id ).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, data) {
            return AdminNotificationService.create(data).then(
                (response) => {
                    // commit("notificationSuccess", response.data.notification);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("notificationFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminNotificationService.update(id, data).then(
                (response) => {
                    // commit("notificationSuccess", response.data.notification);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("notificationFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, id) {
            return AdminNotificationService.delete(id).then(
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
        AddNotification(state, payload) {
            state.notifications = payload;
        },

        removeNotification(state, payloadId) {
            state.notifications = state.notifications.filter((notification) => {
                return notification.id != payloadId;
            });
        },

        clearNotification(state) {
            state.notifications = [];
        },
    },
};
