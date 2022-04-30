import { createStore } from 'vuex'
import { adminAccount } from './modules/admin.account.module'
import createPersistedState from 'vuex-persistedstate'

const store = createStore({
    modules: {
        adminAccount,
    },
    plugins: [createPersistedState()],
})

export default store
