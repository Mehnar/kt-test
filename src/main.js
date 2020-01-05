import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as types from './store/types';
import Preloader from './plugins/preloader';
import {
  Popover,
  Button,
  Radio,
  Pagination,
  Checkbox,
  Message,
} from 'element-ui';
import './element-variables.scss';

Vue.use(Popover);
Vue.use(Button);
Vue.use(Radio);
Vue.use(Pagination);
Vue.use(Checkbox);

Vue.prototype.$message = Message;

Vue.use(Preloader);
Vue.prototype.$types = types;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
