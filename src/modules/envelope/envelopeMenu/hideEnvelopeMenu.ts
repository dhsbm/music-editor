import { envelopeMenuData } from '..'

/**
 * @description: 隐藏音谱菜单
 * @return {void}
 */
const hideEnvelopeMenu = () => {
  if (envelopeMenuData.sign) {
    envelopeMenuData.show = false
  } else {
    envelopeMenuData.sign = true
  }
}

export default hideEnvelopeMenu
