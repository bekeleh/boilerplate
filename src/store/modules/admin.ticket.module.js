import AdminTicketService from "../../services/admin.ticket.service";

export const adminTicket = {
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
            return AdminTicketService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        paginateRecent({ commit }, data) {
            return AdminTicketService.paginateRecent(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        paginateAssigned({ commit }, data) {
            return AdminTicketService.paginateRecent(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        paginateMy({ commit }, data) {
            return AdminTicketService.paginateMy(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        paginateClosed({ commit }, data) {
            return AdminTicketService.paginateClosed(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchTicket({ commit }, data) {
            return AdminTicketService.fetchTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchMyTicket({ commit }, data) {
            return AdminTicketService.fetchMyTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchSearchTicket({ commit }, data) {
            return AdminTicketService.fetchSearchTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        SearchTicketById({ commit }, data) {
            return AdminTicketService.SearchTicketById(data).then(
                (response) => {
                    commit(
                        "ticketRequirements",
                        response.data.data.requirements
                    );
                    commit("ticketFiles", response.data.data.files);
                    commit("adminNotification/removeNotification", data.id, {
                        root: true,
                    });
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchApproveTicket({ commit }, data) {
            return AdminTicketService.fetchApproveTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchAssignedTicket({ commit }, data) {
            return AdminTicketService.fetchAssignedTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchClosedTicket({ commit }, data) {
            return AdminTicketService.fetchClosedTicket(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchTicketById({ commit }, data) {
            return AdminTicketService.fetchTicketById(data).then(
                (response) => {
                    commit(
                        "ticketRequirements",
                        response.data.data.requirements
                    );
                    commit("ticketFiles", response.data.data.files);
                    commit("adminNotification/removeNotification", data.id, {
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
            return AdminTicketService.create(ticket).then(
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
            return AdminTicketService.update(id, data).then(
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

        delete({ commit }, ticket) {
            return AdminTicketService.delete(ticket).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        assign({ commit }, data) {
            return AdminTicketService.assign(data).then(
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

        approve({ commit }, data) {
            return AdminTicketService.approve(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        downloadAttachment({ commit }, name) {
            return AdminTicketService.downloadAttachment(name).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },
        removeAttachment({ commit }, ticket) {
            return AdminTicketService.removeAttachment(ticket).then(
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
            // provide space for new attachment
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
