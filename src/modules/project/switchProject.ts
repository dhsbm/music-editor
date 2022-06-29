import { isLatest } from 'modules/history'
import { openProject, switchProjectWindowData } from '.'
import { showSavePrompt } from 'modules/prompt'
import { globalData } from 'modules/globalData'

/**
 * @description: 打开选中的项目
 * @param {number} index 索引
 * @return {void}
 */
const switchProject = (index: number) => {
  if (index == -1) return
  if (!isLatest()) {
    showSavePrompt(() => switchProject(index))
    return
  }
  const projectId = switchProjectWindowData.projectList[index].projectId
  if (projectId == globalData.project.projectId) return
  openProject(projectId)
}

export default switchProject
