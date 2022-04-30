import AdminRegionService from "../../services/admin.region.service";

export const adminRegion = {
    namespaced: true,
    state: {
        regions: [],
    },
    getters: {
        getRegions: (state) => {
            return state.regions;
        },
    },
    actions: {
        paginate({ commit }, data) {
            return AdminRegionService.paginate(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRegion({ commit }, data) {
            return AdminRegionService.fetchRegion(data).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        fetchRegionById({ commit }, region) {
            return AdminRegionService.fetchRegionById(region).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },

        create({ commit }, region) {
            return AdminRegionService.create(region).then(
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
            return AdminRegionService.update(id, data).then(
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

        delete({ commit }, region) {
            return AdminRegionService.delete(region).then(
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
