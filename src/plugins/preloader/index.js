import Bus from '@/bus';
import Preloader from './Preloader';

export default {
  install(Vue) {
    Vue.prototype.$preloader = {
      active() {
        Bus.$emit('preloader:active')
      },
      deactive() {
        Bus.$emit('preloader:deactive');
      },
    };

    Vue.component('preloader', Preloader);
  }
};
