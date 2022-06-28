/* eslint-disable @typescript-eslint/no-explicit-any */
import { debounce } from '.'

/**
 * @description: 节流函数
 * @param {() => void} func 要节流的函数，内部函数
 * @param {number} wait 冷却时间
 * @param {boolean} [leading] 规定在延迟开始前是否调用内部函数，默认调用
 * @return {() => void} 已节流的函数
 */
function throttle(func: any, wait: number, leading = true) {
  return debounce(func, wait, wait, leading)
}

export default throttle
