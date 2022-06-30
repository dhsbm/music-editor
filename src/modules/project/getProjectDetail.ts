import { bpm } from 'modules/time'
import { globalData } from 'modules/globalData'
import { trackData } from 'modules/track'
import { getBarOrTime } from '.'
import { Project } from '@/class'

/**
 * @description: 获取保存数据时的数据
 * @return {string}
 */
const getProjectDetail = () => {
  const project = globalData.project
  const data = {
    title: project.title, // 项目标题
    bpm: bpm.value, // bpm
    trackAmount: trackData.trackCount, // 音轨数
    barAmount: getBarOrTime('bar'), // 小节数
    projectData: Project.stringify(project), // 项目数据
  }

  return data
}

export default getProjectDetail
