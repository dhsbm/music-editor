import { workerCanvasData } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { workerSig } from 'modules/time'
import { toMultiple } from 'modules/tools'
import { trackData, addTrack } from 'modules/track'
import { selectPattern, drawPattern } from '.'
import { Pattern, NoteData } from '@/class'

/**
 * @description: 添加音谱
 * @param {MouseEvent} e 鼠标事件对象
 * @param {NoteData} [noteData] 是否有现成数据(由素材库提供)
 * @return {Pattern} 返回添加的音谱
 */
const addPattern = (e: MouseEvent, noteData: NoteData | undefined = undefined) => {
  const { trackCount, trackOrder } = trackData
  const { beatWidth, leftBeat, beatHeight, coverPixelY } = workerCanvasData
  const x = toMultiple(e.offsetX + leftBeat * beatWidth, (beatWidth * 4) / workerSig.value)
  const y = e.offsetY + coverPixelY
  const row = (y / beatHeight) | 0
  let trackId = trackOrder[row]
  if (y >= beatHeight * trackCount) {
    trackId = addTrack().trackId
  }
  noteData = noteData || new NoteData(0)
  const pattern = new Pattern(0, trackId, noteData.noteDataId, 0, 4 / workerSig.value)
  pattern.start += x / beatWidth
  pattern.end += x / beatWidth
  pattern.offsetX += x / beatWidth
  pattern.addSelf()
  drawPattern(pattern)
  selectPattern(pattern)
  // 做记录
  recordHistory({ type: 2, describe: '添加音谱', target: [pattern] })
  return pattern
}

export default addPattern
