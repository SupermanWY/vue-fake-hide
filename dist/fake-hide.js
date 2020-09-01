(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fakeHide = {}));
}(this, (function (exports) { 'use strict';

  const fakeHideV2 = {
    bind: hide,
    componentUpdated: hide
  };

  const opacityMap = new WeakMap();
  const translateMap = new WeakMap();

  function hide(el, { value, oldValue, modifiers }) {
    if (value === oldValue) {
      return;
    }
    modifiers.opacity && opacityHide(el, value);
    modifiers.translate && translateHide(el, value);
  }

  function opacityHide(el, wetherHide) {
    if (wetherHide) {
      const opacity = window.getComputedStyle(el).getPropertyValue('opacity');
      opacityMap.set(el, opacity);
      el.style.opacity = 0;
    } else {
      el.style.opacity = opacityMap.get(el);
    }
  }

  function translateHide(el, wetherHide) {
    if (wetherHide) {
      const translate = window.getComputedStyle(el).getPropertyValue('translate');
      translateMap.set(el, translate);
      el.style.transform = 'translateX(9999999px)';
    } else {
      el.style.translate = translateMap.get(el);
    }
  }

  var index = {
    install(Vue) {
      const version = Number(Vue.version.split('.')[0]);
      if (version === 2) {
        Vue.directive('fakeHide', fakeHideV2);
      }
    }
  };

  exports.default = index;
  exports.fakeHideV2 = fakeHideV2;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
