import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from "./router";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueRouter);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app');
