import { drawPattern } from 'modules/pattern'
import { drawEnvelope } from 'modules/envelope'
import { Track, Envelope, Pattern } from '@/class'

/**
 * @description: 绘制音轨中的所有音谱
 * @param {Track} track 要绘制的音轨
 * @return {null}
 */
const drawTrack = (track: Track) => {
  // todos 这里应该加过滤条件
  for (const patternId of track.patternIdSet) {
    const pattern = Pattern.getPattern(patternId)
    drawPattern(pattern)
  }
  for (const envelopeId of track.envelopeIdSet) {
    const envelope = Envelope.getEnvelope(envelopeId)
    drawEnvelope(envelope)
  }
}

export default drawTrack
