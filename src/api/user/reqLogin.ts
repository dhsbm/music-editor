import { mockAjax, ResponseInterface } from '..'

interface LoginParams {
  userName: string
  password: string
}

interface LoginResponse extends ResponseInterface {
  data: {
    userName: string
    userId: string
    token: string
  } | null
}

/**
 * @description: 登录请求API
 * @param {LoginParams} params 请求参数：用户名、密码
 * @return {Promise<LoginResponse>} 返回数据包含用户名、用户id、token
 */
const reqLogin = (params: LoginParams): Promise<LoginResponse> => mockAjax.post('/login', params)

export default reqLogin
