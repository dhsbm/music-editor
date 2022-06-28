import { mockAjax, ResponseInterface } from '..'

interface LogoutResponse extends ResponseInterface {
  data: null
}

/**
 * @description: 退出登录API
 * @return {Promise<LogoutResponse>} 返回数据无内容
 */
const reqLogout = (): Promise<LogoutResponse> => mockAjax.post('/logout')

export default reqLogout
