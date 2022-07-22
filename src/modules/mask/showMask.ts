import { maskData } from '.'

/**
 * @description: 显示遮罩层
 * @param {function} fun 点击遮罩层执行的函数
 * @param {boolean} isTime 是否是播放遮罩层，需要裁剪
 * @return {void}
 */
const showMask = (fun: Fun = undefined, isTime = false) => {
  maskData.show = true
  maskData.fun = fun
  if (isTime) {
    maskData.style = 'clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0, 930px 0, 930px 50px, 750px 50px, 750px 0)'
  }
}
export default showMask

type Fun = undefined | (() => void)
