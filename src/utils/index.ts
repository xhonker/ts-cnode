/**
 * 写入本地Storage
 *
 * @param {string} key
 * @param {string} val
 */
export const setLocalStorage = (key: string, val: string): void =>
  window.localStorage.setItem(key, val);

/**
 * 获取本地Storage
 *
 * @export
 * @param {string} key
 * @returns {string}
 */
export const getLocalStorage = (key: string): string =>
  window.localStorage.getItem(key)!;
/**
 * 移出localStorage item
 * @param key key
 */
export const removeLocalStorage = (key: string) => window.localStorage.removeItem(key);
/**
 * 获取元素属性
 * @param elCls 类名
 * @param attr 属性名
 */
export const getElementAttr = (elCls: string, attr: string) =>
  // @ts-ignore
  document.querySelector(elCls)[attr];

/**
 * 计算数组所有元素的clientHeight
 *
 * @export
 * @param {Array<string>} elCls
 * @returns {number}
 */
export const calcClientHeight = (elCls: Array<string>): number =>
  elCls.reduce((acc, cur) => (acc += getElementAttr(cur, "clientHeight")), 0);

/**
 * 设置元素属性
 *
 * @export
 * @param {string} elCls class
 * @param {string} attr 属性
 * @param {*} val 值
 */
export const setElementAttr = (elCls: string, attr: string, val: any) =>
  document.querySelector(elCls)!.setAttribute(attr, val);

export const docH = document.documentElement.clientHeight;
