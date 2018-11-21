import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from "./router";

library.add(faUserSecret);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
