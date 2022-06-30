import { throttle } from '.'
/**
 * @description: 拖动元素
 * @param {MouseEvent} e 触发事件对象
 * @param {{transform: string}>} style 要修改的元素样式
 * @return {void}
 */
const moveDom = (e: MouseEvent, style: { transform: string }) => {
  if (e.button != 0) return // 检测是否为左键按下
  // 匹配transform的表达式
  const reg = /translate\(([-]?\d+)px,\W([-]?\d+)px\)/
  const oldPageX = e.pageX,
    oldPageY = e.pageY,
    oldtransformData: any = style.transform.match(reg),
    oldTranslateX = parseFloat(oldtransformData[1]),
    oldTranslateY = parseFloat(oldtransformData[2])

  const move = throttle((event: MouseEvent) => {
    const difX = event.pageX - oldPageX
    const difY = event.pageY - oldPageY
    style.transform = `translate(${oldTranslateX + difX}px, ${oldTranslateY + difY}px)`
  }, 15)
  const moveEnd = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}

export default moveDom
