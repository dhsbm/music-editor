import { globalData } from 'modules/globalData'
import { switchProjectWindowData, saveProjectWindowData } from 'modules/project'

/**
 * @description: 退出登录
 * @return {void}
 */
const logout = () => {
  globalData.login = false
  globalData.user = { userName: '', userId: '' }
  // 关闭各种需要登录的功能
  saveProjectWindowData.show = false
  switchProjectWindowData.show = false
}

export default logout
