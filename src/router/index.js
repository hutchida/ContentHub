import Vue from 'vue';
import Router from 'vue-router';
import UnderReview from '@/components/UnderReview';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/:id',
      name: 'UnderReview',
      component: UnderReview,
    }
  ],
  mode: 'hash',
});
