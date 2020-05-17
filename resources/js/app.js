import Vue from 'vue'
import router from './router.js'
import store from './store.js'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)


new Vue({
    el: '#dw',
    router,
    store,
    components: {
        App
    }
})
