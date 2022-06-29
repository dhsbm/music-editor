import { trackMenuData } from '..'

/**
 * @description: 隐藏导轨菜单
 * @return {void}
 */
const hideTrackMenu = () => {
  if (trackMenuData.sign) {
    trackMenuData.show = false
  } else {
    trackMenuData.sign = true
  }
}

export default hideTrackMenu
