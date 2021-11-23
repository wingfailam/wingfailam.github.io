import Vue from 'vue';
import moment from 'moment';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faUserSecret, faGlobeAmericas, faUsers, faTags,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.filter('timeString', (value, myFormat) => moment(value).format(myFormat || 'YYYY-MM-DD, HH:mm:ss'));
library.add(faUserSecret, faGlobeAmericas, faUsers, faTags);

Vue.component('font-awesome-icon', FontAwesomeIcon);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
