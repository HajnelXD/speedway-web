import Vue from 'vue';
import VueRouter from 'vue-router';

import MatchStatistics from '@/views/match-statistics.vue';
import IndexPage from '@/views/index-page.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: IndexPage },
  {
    path: '/match-stats',
    name: 'match-stats',
    component: MatchStatistics,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
