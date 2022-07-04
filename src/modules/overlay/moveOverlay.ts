import { hideHit, showHit } from 'modules/hit'
import { playData } from 'modules/audio'
import { toRange, adsorb } from 'modules/tools'
import { overlayData } from '.'

/**
 * @description: 遮罩层拖动
 * @param {MouseEvent} e 鼠标事件对象
 * @param {number} beatWidth 一拍的宽度
 * @return {void}
 */
const moveOverlay = (e: MouseEvent, beatWidth: number) => {
  if (e.button != 0) return // 检测是否为左键按下
  playData.cycle = true
  const oldPageX = e.pageX
  const oldStart = overlayData.start
  const oldEnd = overlayData.end
  if (overlayData.changeEnd || overlayData.changeStart) {
    showHit('ew-resize')
  }
  const move = (event: MouseEvent) => {
    const dif = (event.pageX - oldPageX) / beatWidth
    if (overlayData.changeStart) {
      overlayData.start = adsorb(toRange(oldStart + dif, oldEnd - 1, 0), 1, 0.1)
    } else if (overlayData.changeEnd) {
      overlayData.end = adsorb(Math.max(oldStart + 1, oldEnd + dif))
    } else {
      if (oldStart + dif < 0) return
      overlayData.start = adsorb(oldStart + dif)
      overlayData.end = adsorb(oldEnd + dif)
    }
  }
  const moveEnd = () => {
    hideHit()
    overlayData.changeStart = false
    overlayData.changeEnd = false
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}

export default moveOverlay
