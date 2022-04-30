import { Ability } from "@casl/ability";

export const authorize = {
    namespaced: true,
    state: {
        rules: [],
    },

    getters: {
        ability: (state) => new Ability(state.rules),
    },

    actions: {
        defineAbility({ commit, getters }, permissions) {
            let formattedRules = [];
            if (permissions.length > 0) {
                formattedRules = permissions.map((perm) => {
                    const formattedObj = {};
                    formattedObj.action = perm.substr(0, perm.indexOf("_"));
                    formattedObj.subject = perm.substr(perm.indexOf("_") + 1);
                    return formattedObj;
                });
            }

            commit("SET_ABILITY", formattedRules);
        },
    },

    mutations: {
        SET_ABILITY(state, payload) {
            state.rules = payload;
        },
    },
};
