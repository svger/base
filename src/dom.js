/**
 * 获取DOM元素容器
 *
 * @deprecated 使用 document.querySelector/querySelectorAll,
 *             iOS 8.* contains a bug where selecting siblings of filtered id selections are no longer working (for example #a + p).
 * @param id
 * @returns {Element}
 */
export const getElement = ({
  id
}) => {
  if (id) {
    return document.getElementById(id);
  }
}

/**
 * 获取 scrollTop
 *
 * @returns {number}
 */
export const getScrollTop = () => {
  return window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

/**
 * 获取scrollLeft
 *
 * @returns {number}
 */
export const getScrollLeft = () => {
  return window.pageXOffset || (document.documentElement || document.body.parentNode || document.body).scrollLeft;
}

/**
 * 获取浏览器可视区域高度
 */
export const getWindowHeight = () => {
  // 部分华为机型获取不到 innerHeight
  return window.innerHeight || window.outerHeight;
}

/**
 * 输入框弹起键盘后，保证输入框在键盘之上
 * @type {{set, reset}}
 */
export const keyboardAdapter = (() => {
  let KEYBOARD_HEIGHT = '';

  const set = ({
    el,
    elementId,
    wrapper
  } = {}) => {
    const container = elementId ? getElement({
      id: elementId
    }) : el;
    const rect = container.getBoundingClientRect();
    const scrollTop = getScrollTop();
    // 这里的30是微调高度，保证数据输入框在页面上能完全显示出来
    const wrapperTop = _getKeyboardHeight() - (getWindowHeight() - rect.bottom) + scrollTop + 10;
    const wrapperContainer = getElement({
      id: wrapper || 'mainWrapper'
    });

    wrapperContainer.style.top = `-${wrapperTop}px`;
  }

  const reset = ({
    el,
    elementId,
    wrapper
  } = {}) => {
    const scrollTop = getScrollTop();
    const wrapperContainer = getElement({
      id: wrapper || 'mainWrapper'
    });

    wrapperContainer.style.top = '0px';
    scrollTop && window.scrollTo(0, scrollTop);
  }

  function _getKeyboardHeight() {
    if (KEYBOARD_HEIGHT) {

      return KEYBOARD_HEIGHT;
    }

    const htmlFontSize = document.documentElement.style.fontSize;
    const responsiveUnit = htmlFontSize.split('px')[0];
    const KEYBOARD_ITEM_HEIGHT = 54 * 4; // 54是一个键盘按键的高度，单位是rem, 一个键盘高度上有4个按键

    KEYBOARD_HEIGHT = (responsiveUnit / 100) * KEYBOARD_ITEM_HEIGHT;

    return (KEYBOARD_HEIGHT === 0) ? 220 : KEYBOARD_HEIGHT;
  }

  return {
    set,
    reset
  }
})();
