import { Envelope, Pattern, Track } from '@/class'
import { selectEnvelope } from 'modules/envelope'
import { selectPattern } from 'modules/pattern'

/**
 * @description: 选择音轨所有音谱和包络
 * @param {Track} track 音轨
 * @return {void}
 */
const selectTrackItem = (track: Track) => {
  selectPattern() // 清空选区域
  selectEnvelope()

  for (const patternId of track.patternIdSet) {
    selectPattern(Pattern.getPattern(patternId), false)
  }

  for (const envelopeId of track.envelopeIdSet) {
    selectEnvelope(Envelope.getEnvelope(envelopeId), false)
  }
}

export default selectTrackItem
