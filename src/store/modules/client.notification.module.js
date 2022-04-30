import ClientNotificationService from "../../services/client.notification.service";

export const clientNotification = {
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
            return ClientNotificationService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchNotification({ commit }, data) {
            return ClientNotificationService.fetchNotification(data).then(
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

        fetchNotificationById({ commit }, notification) {
            return ClientNotificationService.fetchNotificationById(
                notification
            ).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, notification) {
            return ClientNotificationService.create(notification).then(
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
            return ClientNotificationService.update(id, data).then(
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

        delete({ commit }, notification) {
            return ClientNotificationService.delete(notification).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        markUsRead({ commit }) {
            return ClientNotificationService.markUsRead().then(
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
