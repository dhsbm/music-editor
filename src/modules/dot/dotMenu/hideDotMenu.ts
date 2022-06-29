import { dotMenuData } from '..'

/**
 * @description: 隐藏音节菜单
 * @return {void}
 */
const hideDotMenu = () => {
  if (dotMenuData.sign) {
    dotMenuData.show = false
  } else {
    dotMenuData.sign = true
  }
}

export default hideDotMenu
