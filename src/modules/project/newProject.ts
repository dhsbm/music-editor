import { openProject } from 'modules/project'
import { isLatest } from 'modules/history'
import { showSavePrompt } from 'modules/prompt'

/**
 * @description: 新建项目作为当前项目
 * @param {boolean} random 是否随机生成项目 默认为false
 * @return {void}
 */
const newProject = (random: boolean) => {
  if (!isLatest()) {
    showSavePrompt(() => newProject(random))
    return
  }
  if (random) {
    // 随机生成 发请求拿数据
    openProject(-1)
  } else {
    // 如果没有传入项目数据，使用默认数据
    openProject(0)
  }
}

export default newProject
