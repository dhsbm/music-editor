import { workerCanvasData } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { workerSig } from 'modules/time'
import { toMultiple } from 'modules/tools'
import { trackData, addTrack } from 'modules/track'
import { selectEnvelope, drawEnvelope } from '.'
import { Envelope, DotData } from '@/class'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 添加音谱
 * @param {MouseEvent} e 鼠标事件对象
 * @return {Envelope} 返回添加的音谱
 */
const addEnvelope = (e: MouseEvent) => {
  const { trackCount, trackOrder } = trackData
  const { beatWidth, leftBeat, beatHeight, coverPixelY } = workerCanvasData
  const x = toMultiple(e.offsetX + leftBeat * beatWidth, (beatWidth * 4) / workerSig.value)
  const y = e.offsetY + coverPixelY
  const row = (y / beatHeight) | 0
  let trackId = trackOrder[row]
  if (y >= beatHeight * trackCount) {
    trackId = addTrack().trackId
  }
  const dotData = new DotData(0)
  const envelope = new Envelope(0, trackId, dotData.dotDataId, 0, 4 / workerSig.value)
  envelope.start += x / beatWidth
  envelope.end += x / beatWidth
  envelope.offsetX += x / beatWidth
  envelope.addSelf()
  drawEnvelope(envelope)
  selectEnvelope(envelope)
  // 做记录
  recordHistory({ type: HistoryType.Envelop, describe: '添加包络', target: [envelope] })
  return envelope
}

export default addEnvelope
