import { globalData } from 'modules/globalData'
import { openProject } from 'modules/project'

/**
 * @description: 初始化工程
 * @return {void}
 */
const initProject = () => {
  // 检测登录状态，若登录，显示用户的项目，创建默认工程
  if (globalData.login) {
    // 发送请求取工程数据
    openProject(1)
  } else {
    openProject(0)
  }
}

export default initProject
