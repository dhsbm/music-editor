import { Project } from '@/class'

const globalData = {
  project: <Project>(<unknown>undefined), // 当前项目
  login: false, // 是否登录
  user: { userName: '', userId: '' }, // 登录用户
  pressed: false, // 鼠标是否处于按下状态
}

export default globalData
