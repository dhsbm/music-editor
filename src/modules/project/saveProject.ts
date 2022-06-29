import { globalData } from 'modules/globalData'
import { showCenterPrompt } from 'modules/prompt'
import { historyData, isLatest } from 'modules/history'
import { reqSaveProject } from '@/api'
import { getProjectDetail } from '.'

/**
 * @description: 保存项目
 * @return {void}
 */
const saveProject = async () => {
  // 是最新状态，无需保存
  if (isLatest()) {
    showCenterPrompt('当前项目未修改，无需保存')
    return
  }
  showCenterPrompt('开始保存')
  const projectId = globalData.project.patternId

  const response = await reqSaveProject(projectId, getProjectDetail())
  if (response.code == 200) {
    showCenterPrompt('保存成功')
    historyData.newStep = 0
    historyData.oldStep = 0
  } else {
    showCenterPrompt('保存失败，请检查网络情况稍后重试')
  }
}

export default saveProject
