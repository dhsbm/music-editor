import { historyData, isLatest } from 'modules/history'
import { openProject, switchProjectWindowData, saveProject } from '.'
import { showPromptWindow } from 'modules/prompt'

/**
 * @description: 打开选中的项目
 * @param {number} index 索引
 * @return {void}
 */
const switchProject = (index: number) => {
  if (index == -1) return
  if (!isLatest()) {
    showPromptWindow({
      text: '还未保存修改，是否要离开？',
      btn1: '保存',
      fun1: async () => {
        await saveProject()
        switchProject(index)
      },
      btn2: '不保存',
      fun2: () => {
        historyData.newStep = 0
        historyData.oldStep = 0
        switchProject(index)
      },
      btn3: '取消',
    })
    return
  }
  const projectId = switchProjectWindowData.projectList[index].projectId

  openProject(projectId)
}

export default switchProject
