import { fakeHideV2 } from './fake-hide';

export { fakeHideV2 };

export default {
  install(Vue) {
    const version = Number(Vue.version.split('.')[0])
    if (version === 2) {
      Vue.directive('fakeHide', fakeHideV2);
    }
  }
};