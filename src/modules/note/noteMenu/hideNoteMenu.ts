import { noteMenuData } from '..'

/**
 * @description: 隐藏音节菜单
 * @return {void}
 */
const hideNoteMenu = () => {
  if (noteMenuData.sign) {
    noteMenuData.show = false
  } else {
    noteMenuData.sign = true
  }
}

export default hideNoteMenu
