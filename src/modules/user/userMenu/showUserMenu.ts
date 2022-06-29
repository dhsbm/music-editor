import { userButtonData, userMenuData } from '..'

/**
 * @description: 打开个人菜单
 * @return {void}
 */
const showUserMenu = () => {
  userButtonData.style.clipPath = 'path("M 0 50 L 2,25 A 5,5 0,0,1 50,25 L 50 50 z")'
  userButtonData.style.background = '#3f444a'
  userMenuData.show = true
}

export default showUserMenu
