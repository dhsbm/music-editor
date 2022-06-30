import { workerCanvasData } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { workerSig } from 'modules/time'
import { adsorb } from 'modules/tools'
import { trackData, addTrack } from 'modules/track'
import { selectEnvelope, drawEnvelope } from '.'
import { Track, Envelope, DotData } from '@/class'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 为音轨添加包络
 * @param {Track} track 要绑定的音轨
 * @return {Envelope}
 */
const addTrackEnvelope = (track: Track) => {
  const { trackOrder } = trackData
  const { beatWidth, leftBeat } = workerCanvasData
  const x = adsorb(leftBeat, 4 / workerSig.value, 2 / workerSig.value) * beatWidth
  const index = trackOrder.indexOf(track.trackId)
  let nextTrack
  if (index == trackOrder.length - 1) {
    nextTrack = addTrack()
  } else {
    nextTrack = Track.getTrack(trackOrder[index + 1])
  }
  const dotData = new DotData(0)
  const envelope = new Envelope(0, nextTrack.trackId, dotData.dotDataId, 0, 4 / workerSig.value)
  envelope.start += x / beatWidth
  envelope.end += x / beatWidth
  envelope.offsetX += x / beatWidth
  envelope.actTrack = track
  envelope.addSelf()
  drawEnvelope(envelope)
  selectEnvelope(envelope)
  // 做记录
  recordHistory({ type: HistoryType.Envelop, describe: '添加包络', target: [envelope] })
  return envelope
}

export default addTrackEnvelope
