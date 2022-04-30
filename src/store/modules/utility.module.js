import UtilityService from "../../services/utility.service";

export const utility = {
    namespaced: true,
    actions: {
        fetchAssignee({commit}, search) {
            return UtilityService.fetchAssignee(search).then(
                (response) => {
                    return Promise.resolve(response);
                },
                (error) => {
                    return Promise.reject(error);
                }
            );
        },


    },

};
