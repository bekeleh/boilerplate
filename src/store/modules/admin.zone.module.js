import AdminZoneService from "../../services/admin.zone.service";

export const adminZone = {
    namespaced: true,
    state: {
        regions: [],
    },
    getters: {
        getZones: (state) => {
            return state.regions;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminZoneService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchZone({ commit }, data) {
            return AdminZoneService.fetchZone(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchZoneById({ commit }, region) {
            return AdminZoneService.fetchZoneById(region).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, region) {
            return AdminZoneService.create(region).then(
                (response) => {
                    // commit("regionSuccess", response.data.region);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("regionFailure");
                    return Promise.reject(error);
                }
            );
        },

        update({ commit }, { id, data }) {
            return AdminZoneService.update(id, data).then(
                (response) => {
                    // commit("regionSuccess", response.data.region);
                    return Promise.resolve(response);
                },
                (error) => {
                    // commit("regionFailure");
                    return Promise.reject(error);
                }
            );
        },


        delete({ commit }, zone) {
            return AdminZoneService.delete(zone).then(
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
        regionSuccess(state, region) {
            state.regions = region;
        },
        regionFailure(state) {
            state.regions = null;
        },
    },
};
