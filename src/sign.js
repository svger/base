/**
 * utils/sign
 *
 * 接口签名
 */
import md5 from 'md5';

let __signSep = '<=>';

/**
 * 设置签名数据拼接时的分隔符
 *
 * @param {string} sep 分隔符
 */
export function setSignSep(sep) {
  __signSep = sep;
}

/**
 * 签名
 *
 * @param {string} data 数据字符串
 * @param {string} noncestr 随机串
 * @param {string} key 混入的关键业务字段
 */
export function sign(data, noncestr, key) {
  const arr = [noncestr, data, key];

  return md5(arr.join(__signSep));
}

/**
 * 签名
 *
 * @description 不混入业务字段
 * @param {string} data 数据字符串
 * @param {*} noncestr 随机串
 */
export function signLess(data, noncestr) {
  const arr = [noncestr, data];

  return md5(arr.join(__signSep));
}
