import { globalData } from 'modules/globalData'
import { beatToTimeStr } from 'modules/tools'
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

  let beats = 0
  for (const trackId of trackData.trackOrder) {
    const track = project.getTrack(trackId)
    for (const patternId of track.patternIdSet) {
      const pattern = project.getPattern(patternId)
      beats = Math.max(beats, pattern.end)
    }
  }

  if (type == 'bar') {
    return Math.ceil(beats / 4)
  } else if (type == 'time') {
    return beatToTimeStr(Math.ceil(beats))
  }
}

export default getBarOrTime
