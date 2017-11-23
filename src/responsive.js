/**
 * utils/responsive
 */
/**
 * 视觉稿尺寸适应设备屏幕
 * 根据当前的屏幕宽度和视觉稿宽度调整 html 的 font-size
 *
 * @param {number} 视觉稿宽度 / 2
 */
export const adaptPage = (uiWidth = 375, maxWidth = 420) => {
  const docEl = document.documentElement;
  let deviceWidth = docEl.clientWidth;

  if (deviceWidth > maxWidth) {
    deviceWidth = maxWidth;
  }

  docEl.style.fontSize = `${deviceWidth / (uiWidth / 100)}px`;
}
