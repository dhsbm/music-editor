import { globalData } from 'modules/globalData'
import { bpm } from 'modules/time'
import { beatToTime } from 'modules/tools'
import { trackData } from 'modules/track'

/**
 * @description: 获取当前项目的时间/节数
 * @param {'bar' | 'time'} type 要获取的是时间还是节拍数
 * @return {string | number}
 */
function getBarOrTime(type: 'bar'): number
function getBarOrTime(type: 'time'): string
function getBarOrTime(type: string) {
  const project = globalData.project

  let max = 0
  for (const trackId of trackData.trackOrder) {
    const track = project.getTrack(trackId)
    for (const patternId of track.patternIdSet) {
      const pattern = project.getPattern(patternId)
      max = Math.max(max, pattern.end)
    }
  }

  if (type == 'bar') {
    return Math.ceil(max / 4)
  } else if (type == 'time') {
    return beatToTime(Math.ceil(max), bpm.value)
  }
}

export default getBarOrTime
