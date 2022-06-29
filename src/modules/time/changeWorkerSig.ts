import { workerSig, sigList } from '.'

/**
 * @description: 滚动或点击修改sig
 * @param {WheelEvent} e 鼠标滚动事件对象
 * @param {Boolean} isClick 是否为点击触发
 * @return {void}
 */
const changeWorkerSig = (e: WheelEvent, isClick = false) => {
  const index = sigList.indexOf(workerSig.value)
  if (isClick == true) workerSig.value = sigList[(index + 1) % sigList.length]
  else if (e.deltaY > 0 && index > 0) workerSig.value = sigList[index - 1]
  else if (e.deltaY < 0 && index < sigList.length - 1) workerSig.value = sigList[index + 1]
  else return
}

export default changeWorkerSig
