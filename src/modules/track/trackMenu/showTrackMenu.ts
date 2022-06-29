import { changeZIndex } from 'modules/tools'
import { trackMenuData } from '..'

/**
 * @description: 显示音轨菜单
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const showTrackMenu = (e: MouseEvent) => {
  trackMenuData.sign = false
  trackMenuData.show = true
  trackMenuData.style.left = e.pageX + 'px'
  trackMenuData.style.top = e.pageY + 'px'
  changeZIndex(trackMenuData.style)
}

export default showTrackMenu
