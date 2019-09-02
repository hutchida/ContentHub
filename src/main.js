// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import infiniteScroll from 'vue-infinite-scroll';
import App from './App';
import router from './router';
import VueJsonToCsv from 'vue-json-to-csv'

Vue.config.productionTip = false;
Vue.use(HighchartsVue);
Vue.use(BootstrapVue);
Vue.use(infiniteScroll);
Vue.component('vue-json-to-csv', VueJsonToCsv);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

new Vue({
  data() {
    return {
      chartOptions: {
        series: [{
          data: [1,2,3] // sample data
        }]
      }
    }
  }
})  
