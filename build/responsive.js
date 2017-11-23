"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * utils/responsive
 */
/**
 * 视觉稿尺寸适应设备屏幕
 * 根据当前的屏幕宽度和视觉稿宽度调整 html 的 font-size
 *
 * @param {number} 视觉稿宽度 / 2
 */
var adaptPage = exports.adaptPage = function adaptPage() {
  var uiWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 375;
  var maxWidth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 420;

  var docEl = document.documentElement;
  var deviceWidth = docEl.clientWidth;

  if (deviceWidth > maxWidth) {
    deviceWidth = maxWidth;
  }

  docEl.style.fontSize = deviceWidth / (uiWidth / 100) + "px";
};