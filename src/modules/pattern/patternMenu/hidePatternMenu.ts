import { patternMenuData } from '..'

/**
 * @description: 隐藏音谱菜单
 * @return {void}
 */
const hidePatternMenu = () => {
  if (patternMenuData.sign) {
    patternMenuData.show = false
  } else {
    patternMenuData.sign = true
  }
}

export default hidePatternMenu
