import { reqLogin } from '@/api'
import { globalData } from 'modules/globalData'

/**
 * @description: 检查是否登录
 * @return {void}
 */
const checkLogin = async () => {
  // 检测token ……
  const hasToken = true
  if (hasToken) {
    // 自动登录
    const response = await reqLogin({ username: 'dh', password: '123456' })
    if (response.code == 200 && response.data) {
      globalData.login = true
      globalData.user = response.data
      // 这里应该存token 以后每次发送请求时携带
    }
  }
}

export default checkLogin
