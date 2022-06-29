import { changeZIndex } from 'modules/tools'
import { noteMenuData } from '..'

/**
 * @description: 显示音节菜单
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const showNoteMenu = (e: MouseEvent) => {
  noteMenuData.sign = false
  noteMenuData.show = true
  noteMenuData.style.left = e.pageX + 'px'
  noteMenuData.style.top = e.pageY + 'px'
  changeZIndex(noteMenuData.style)
}

export default showNoteMenu
