import { showCenterPrompt } from 'modules/prompt'
import { globalData } from 'modules/globalData'
import { hideLoginWindow, loginWindowData } from '.'
import { reqLogin } from '@/api'

/**
 * @description: 登录函数
 * @return {void}
 */
const login = async () => {
  const { username, password } = loginWindowData
  // 这里应该检测输入是否合法，然后发请求
  const response = await reqLogin({
    username,
    password,
  })
  if (response.code == 200 && response.data) {
    globalData.login = true
    globalData.user = response.data
    loginWindowData.tip = ''
    hideLoginWindow()
  } else {
    loginWindowData.tip = '用户名或密码错误'
    showCenterPrompt('测试阶段，输入任意字符即可登录')
  }
  loginWindowData.username = ''
  loginWindowData.password = ''
}

export default login
