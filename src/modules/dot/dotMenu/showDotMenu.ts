import { changeZIndex } from 'modules/tools'
import { dotMenuData } from '..'

/**
 * @description: 显示音节菜单
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const showDotMenu = (e: MouseEvent) => {
  dotMenuData.sign = false
  dotMenuData.show = true
  dotMenuData.style.left = e.pageX + 'px'
  dotMenuData.style.top = e.pageY + 'px'
  changeZIndex(dotMenuData.style)
}

export default showDotMenu
