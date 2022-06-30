import { Track } from '@/class'
import { workerCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { trackData } from '.'

/**
 * @description: 添加音轨
 * @param {boolean} record 是否要记录
 * @return {Track} 音轨实例
 */
const addTrack = (record = true) => {
  const track = new Track(0)
  trackData.trackOrder.push(track.trackId)
  workerCanvasRender()
  // 做记录
  record && recordHistory({ type: HistoryType.Track, describe: '添加音轨', target: track })

  return track
}

export default addTrack
