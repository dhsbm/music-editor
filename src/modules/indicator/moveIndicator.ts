import { indicatorData } from '.'

/**
 * @description: 拖动指针
 * @param {MouseEvent} e 鼠标按下事件对象
 * @param {number} beatWidth 当前1拍的长度
 * @return {void}
 */
const moveIndicator = (e: MouseEvent, beatWidth: number) => {
  if (e.button != 0) return // 检测是否为左键按下
  const oldPageX = e.pageX
  const oldStart = indicatorData.start
  const move = (event: MouseEvent) => {
    indicatorData.start = Math.max(0, oldStart + (event.pageX - oldPageX) / beatWidth)
  }
  const moveEnd = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}

export default moveIndicator
