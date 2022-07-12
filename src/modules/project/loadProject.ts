import { Project } from '@/class'
import { globalData } from 'modules/globalData'
import { historyData, historyList } from 'modules/history'
import { selectedNoteList } from 'modules/note'
import { selectedPatternList } from 'modules/pattern'
import { trackData } from 'modules/track'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { bpm } from 'modules/time'

/**
 * @description: 加载项目
 * @param {Project} project 项目
 * @return {void}
 */
const loadProject = (project: Project) => {
  globalData.project = project
  bpm.value = project.bpm
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
  historyList.splice(0, historyList.length)

  recordHistory({ type: HistoryType.Init, describe: '初始化项目', target: project })
}

export default loadProject
