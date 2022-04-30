import ClientTicketService from "../../services/client.ticket.service";

export const clientTicket = {
    namespaced: true,
    state: {
        requirements: [],
        files: [],
        newFiles: [],
    },
    getters: {
        getFiles: (state) => {
            return state.files;
        },
        getRequirement: (state) => {
            return state.requirements;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return ClientTicketService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetch({ commit }, data) {
            return ClientTicketService.fetch(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchTicketById({ commit }, data) {
            return ClientTicketService.fetchTicketById(data).then(
                (response) => {
                    commit(
                        "ticketRequirements",
                        response.data.data.requirements
                    );
                    commit("ticketFiles", response.data.data.files);
                    commit("clientNotification/removeNotification", data.id, {
                        root: true,
                    });
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, ticket) {
            return ClientTicketService.create(ticket).then(
                (response) => {
                    // commit("ticketSuccess", response.data.ticket);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("ticketFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return ClientTicketService.update(id, data).then(
                (response) => {
                    // commit("ticketSuccess", response.data.ticket);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("ticketFailure");
                    return Promise.reject(error);
                }
            );
        },

        delete({ commit }, data) {
            return ClientTicketService.delete(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        downloadAttachment({ commit }, ticket) {
            return ClientTicketService.downloadAttachment(ticket).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        removeAttachment({ commit }, ticket) {
            return ClientTicketService.removeAttachment(ticket).then(
                (response) => {
                    commit("removeTicketFile", ticket);
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
    },
    mutations: {
        ticketSuccess(state, ticket) {
            state.ticket = ticket;
        },
        ticketFailure(state) {
            state.ticket = null;
        },
        ticketRequirements(state, requirements) {
            state.requirements = requirements;
        },
        ticketFiles(state, files) {
            state.files = files;
        },
        ticketNewFiles(state, files) {
            state.newFiles = files;
        },

        changeTicketFile(state) {
            if (!state.files) {
                return;
            }
            if (!state.requirements) {
                return;
            }
            state.newFiles = state.requirements.filter((reqFile) =>
                state.files.every(
                    (file) => !reqFile.name.includes(file.pivot.requested_file)
                )
            );
        },

        removeTicketFile(state, name) {
            let index = state.files.findIndex((file) => file.name === name);
            state.files.splice(index, 1);
            state.newFiles = state.requirements.filter((reqFile) =>
                state.files.every(
                    (file) => !reqFile.name.includes(file.pivot.requested_file)
                )
            );
        },
    },
};
