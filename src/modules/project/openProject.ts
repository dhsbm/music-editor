import { reqProjectData } from '@/api'
import { Project } from '@/class'
import { globalData } from 'modules/globalData'
import { bpm } from 'modules/time'
import { historyData, historyList } from 'modules/history'
import { selectedNoteList } from 'modules/note'
import { selectedPatternList } from 'modules/pattern'
import { trackData } from 'modules/track'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 打开项目
 * @param {number} projectId 项目id
 * @return {Promise<void>}
 */
const openProject = async (projectId: number) => {
  const response = await reqProjectData(projectId)
  if (response.code == 200 && response.data) {
    const data = response.data
    const projectData = data.projectData
    bpm.value = data.bpm
    const project = Project.parse(JSON.parse(projectData))
    globalData.project = project
    // 重置音轨
    trackData.trackMap = project.trackMap
    const trackOrder = []
    for (let i = 1; i <= project.trackMap.size; i++) {
      trackOrder.push(i)
    }
    trackData.trackOrder = trackOrder

    document.title = project.projectTitle // 改标题

    // 清空选择区
    selectedNoteList.clear()
    selectedPatternList.clear()
    // 维护历史记录
    historyData.lastIndex = historyData.index = -1
    historyData.newStep = historyData.oldStep = 0
    // 先假删除，不然热更新总报错
    historyList.splice(0, historyList.length)

    recordHistory({ type: HistoryType.Init, describe: '初始化项目', target: project })
  }
}

export default openProject
