import { changeZIndex } from 'modules/tools'
import { envelopeMenuData } from '..'

/**
 * @description: 显示音谱菜单
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const showEnvelopeMenu = (e: MouseEvent) => {
  envelopeMenuData.sign = false
  envelopeMenuData.show = true
  envelopeMenuData.style.left = e.pageX + 'px'
  envelopeMenuData.style.top = e.pageY + 'px'
  changeZIndex(envelopeMenuData.style)
}

export default showEnvelopeMenu
