import { openProject, saveProject } from '.'
import { historyData, isLatest } from 'modules/history'
import { showPromptWindow } from 'modules/prompt'

/**
 * @description: 新建项目作为当前项目
 * @param {boolean} random 是否随机生成项目 默认为false
 * @return {void}
 */
const newProject = (random: boolean) => {
  if (!isLatest()) {
    showPromptWindow({
      text: '还未保存修改，是否要离开？',
      btn1: '保存',
      fun1: async () => {
        await saveProject()
        newProject(random)
      },
      btn2: '不保存',
      fun2: () => {
        historyData.newStep = 0
        historyData.oldStep = 0
        newProject(random)
      },
      btn3: '取消',
    })
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
