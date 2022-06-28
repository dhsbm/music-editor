import { toRange } from '.'

interface SelectBoxStyle {
  outlineWidth: string
  top: string
  left: string
  width: string
  height: string
}

let oldPageX: number, oldPageY: number, oldOffsetX: number, oldOffsetY: number
/**
 * @description: 初始化选择框数据
 * @param {MouseEvent} e
 * @param {SelectBoxStyle} selectBoxStyle 选择框绑定的样式
 * @return {void}
 */
export const initSelectBox = (e: MouseEvent, selectBoxStyle: SelectBoxStyle): void => {
  oldPageX = e.pageX
  oldPageY = e.pageY
  oldOffsetX = e.offsetX
  oldOffsetY = e.offsetY
  selectBoxStyle.outlineWidth = '1px'
}

/**
 * @description: 获取选择框数据
 * @param {MouseEvent} e
 * @param {SelectBoxStyle} selectBoxStyle 选择框绑定的样式
 * @return {object} 选择框的属性值
 */
export const getSelectBox = (e: MouseEvent, selectBoxStyle: SelectBoxStyle) => {
  const newOffsetX = Math.max(oldOffsetX + e.pageX - oldPageX, 0),
    newOffsetY = Math.max(oldOffsetY + e.pageY - oldPageY, 0)
  const top = toRange(newOffsetY, oldOffsetY, 0),
    left = toRange(newOffsetX, oldOffsetX, 0),
    width = Math.abs(oldOffsetX - newOffsetX),
    height = Math.abs(oldOffsetY - newOffsetY)
  selectBoxStyle.top = top + 'px'
  selectBoxStyle.left = left + 10 + 'px'
  selectBoxStyle.width = width + 'px'
  selectBoxStyle.height = height + 'px'

  return {
    top,
    left,
    width,
    height,
  }
}
