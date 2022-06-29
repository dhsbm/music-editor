// 初始化中间层

import addListener from './addListener'
import checkLogin from './checkLogin'
import initProject from './initProject'

/**
 * @description: 初始化页面
 * @return {void}
 */
const init = async () => {
  addListener()
  await checkLogin()
  initProject()
}

export { init }
