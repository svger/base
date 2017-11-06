'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 获取DOM元素容器
 *
 * @deprecated 使用 document.querySelector/querySelectorAll,
 *             iOS 8.* contains a bug where selecting siblings of filtered id selections are no longer working (for example #a + p).
 * @param id
 * @returns {Element}
 */
var getElement = exports.getElement = function getElement(_ref) {
  var id = _ref.id;

  if (id) {
    return document.getElementById(id);
  }
};

/**
 * 获取 scrollTop
 *
 * @returns {number}
 */
var getScrollTop = exports.getScrollTop = function getScrollTop() {
  return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

/**
 * 获取scrollLeft
 *
 * @returns {number}
 */
var getScrollLeft = exports.getScrollLeft = function getScrollLeft() {
  return window.pageXOffset || (document.documentElement || document.body.parentNode || document.body).scrollLeft;
};

/**
 * 获取浏览器可视区域高度
 */
var getWindowHeight = exports.getWindowHeight = function getWindowHeight() {
  // 部分华为机型获取不到 innerHeight
  return window.innerHeight || window.outerHeight;
};

/**
 * 输入框弹起键盘后，保证输入框在键盘之上
 * @type {{set, reset}}
 */
var keyboardAdapter = exports.keyboardAdapter = function () {
  var KEYBOARD_HEIGHT = '';

  var set = function set() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        el = _ref2.el,
        elementId = _ref2.elementId,
        wrapper = _ref2.wrapper;

    var container = elementId ? getElement({
      id: elementId
    }) : el;
    var rect = container.getBoundingClientRect();
    var scrollTop = getScrollTop();
    // 这里的30是微调高度，保证数据输入框在页面上能完全显示出来
    var wrapperTop = _getKeyboardHeight() - (getWindowHeight() - rect.bottom) + scrollTop + 10;
    var wrapperContainer = getElement({
      id: wrapper || 'mainWrapper'
    });

    wrapperContainer.style.top = '-' + wrapperTop + 'px';
  };

  var reset = function reset() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        el = _ref3.el,
        elementId = _ref3.elementId,
        wrapper = _ref3.wrapper;

    var scrollTop = getScrollTop();
    var wrapperContainer = getElement({
      id: wrapper || 'mainWrapper'
    });

    wrapperContainer.style.top = '0px';
    scrollTop && window.scrollTo(0, scrollTop);
  };

  function _getKeyboardHeight() {
    if (KEYBOARD_HEIGHT) {

      return KEYBOARD_HEIGHT;
    }

    var htmlFontSize = document.documentElement.style.fontSize;
    var responsiveUnit = htmlFontSize.split('px')[0];
    var KEYBOARD_ITEM_HEIGHT = 54 * 4; // 54是一个键盘按键的高度，单位是rem, 一个键盘高度上有4个按键

    KEYBOARD_HEIGHT = responsiveUnit / 100 * KEYBOARD_ITEM_HEIGHT;

    return KEYBOARD_HEIGHT === 0 ? 220 : KEYBOARD_HEIGHT;
  }

  return {
    set: set,
    reset: reset
  };
}();