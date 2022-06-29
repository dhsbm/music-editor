import { userButtonData, userMenuData } from '..'

/**
 * @description: 隐藏登录窗口
 * @return {void}
 */
const hideUserMenu = () => {
  userButtonData.style.clipPath = ''
  userButtonData.style.background = ''
  userMenuData.show = false
}

export default hideUserMenu
