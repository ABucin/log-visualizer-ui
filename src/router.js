import VisualizeData from './components/VisualizeData.vue';
import VueRouter from "vue-router";

const routes = [
  {
    path: '/',
    name: 'VisualizeData',
    components: {
      main: VisualizeData,
    },
  },
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

export default router;
