import { createApp } from 'vue'
import App from './App.vue'
import routes from './route'
import store from './store'
import VeeValidatePlugin from './plugins/validation'
import { abilitiesPlugin } from '@casl/vue'
import Utils from './mixins'
// import ability from './services/admin.ability.service'

const app = createApp(App)
app.use(routes)
app.use(store)
// app.mixin(Utils)
// app.use(VeeValidatePlugin)
// app.use(abilitiesPlugin, store.getters['authorize/ability']) //store.getters['authorize/ability']

app.mount('#app')
