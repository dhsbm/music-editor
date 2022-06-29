/* eslint-disable @typescript-eslint/no-explicit-any */
import { throttle } from '.'
import { hideHit, showHit } from 'modules/hit'

/**
 * @description: 修改元素的大小
 * @param {MouseEvent} e 触发事件对象
 * @param {string} direction 拖动方向
 * @param {Style} style 要修改的元素样式
 * @return {void}
 */
const resizeDom = (e: MouseEvent, direction: direction, style: Style) => {
  if (e.button != 0) return // 检测是否为左键按下
  // 保留鼠标样式
  if (direction == 'left' || direction == 'right') {
    showHit('ew-resize')
  } else {
    showHit('ns-resize')
  }
  // 匹配transform的表达式
  const reg = /translate\(([-]?\d+)px,\W([-]?\d+)px\)/
  const oldPageX = e.pageX,
    oldPageY = e.pageY,
    oldtransformData: any = style.transform.match(reg),
    oldTranslateX = oldtransformData[1] - 0,
    oldTranslateY = oldtransformData[2] - 0,
    oldHeight = parseInt(style.height),
    oldWidth = parseInt(style.width),
    minHeight = parseInt(style.minHeight),
    minWidght = parseInt(style.minWidth)

  const resize = throttle((event: MouseEvent) => {
    const difX = event.pageX - oldPageX
    const difY = event.pageY - oldPageY
    if (direction == 'bottom') {
      style.height = Math.max(minHeight, oldHeight + difY) + 'px'
    } else if (direction == 'top') {
      style.height = Math.max(oldHeight - difY) + 'px'
      style.transform = `translate(${oldTranslateX}px, ${oldTranslateY + difY}px)`
    } else if (direction == 'right') {
      style.width = Math.max(minWidght, oldWidth + difX) + 'px'
    } else {
      style.width = Math.max(minWidght, oldWidth - difX) + 'px'
      style.transform = `translate(${oldTranslateX + difX}px, ${oldTranslateY}px)`
    }
  }, 15)
  const resizeEnd = () => {
    hideHit()
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', resizeEnd)
  }
  document.addEventListener('mousemove', resize)
  document.addEventListener('mouseup', resizeEnd)
}

export default resizeDom

type direction = 'bottom' | 'top' | 'left' | 'right'
type Style = {
  transform: string
  height: string
  width: string
  minHeight: string
  minWidth: string
}
