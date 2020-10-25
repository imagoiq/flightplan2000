import Vue from 'vue';
import VueRouter from 'vue-router';

const router = new VueRouter({
  routes: [
    {
      name: 'Home',
      path: '/',
      redirect: '/list'
    },
    {
      name: 'ListFlightPlans',
      path: '/list',
      component: () => import(/* webpackChunkName: "RouteListFlightPlans" */ '@/views/flightPlans/List'),
    },
    {
      name: 'CreateFlightPlan',
      path: '/create',
      component: () => import(/* webpackChunkName: "RouteCreateFlightPlan" */ '@/views/flightPlans/Create'),
    },
    {
      name: 'EditFlightPlan',
      path: '/edit/:flightPlanId(\\d+)',
      component: () => import(/* webpackChunkName: "RouteEditFlightPlan" */ '@/views/flightPlans/Edit'),
    }
    // TODO Page 404
  ]
});

Vue.use(VueRouter);
export default router;
