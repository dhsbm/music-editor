import { changeZIndex } from 'modules/tools'
import { patternMenuData } from '..'

/**
 * @description: 显示音谱菜单
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const showPatternMenu = (e: MouseEvent) => {
  patternMenuData.sign = false
  patternMenuData.show = true
  patternMenuData.style.left = e.pageX + 'px'
  patternMenuData.style.top = e.pageY + 'px'
  changeZIndex(patternMenuData.style)
}

export default showPatternMenu
