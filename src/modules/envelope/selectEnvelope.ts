import { Envelope } from '@/class'
import { drawPattern, selectedPatternList } from 'modules/pattern'
import { drawEnvelope, drawSelectedEnvelope, selectedEnvelopeList } from '.'

/**
 * @description: 添加音谱到选择区
 * @param {Envelope} [envelope] 添加的音谱实例，默认为undefined不添加
 * @param {boolean} [clear] 添加前是否需要清空选择区，默认清空
 * @return {void}
 */
const selectEnvelope = (envelope: Envelope | undefined = undefined, clear = true) => {
  if (clear) {
    for (const pattern of selectedPatternList) {
      selectedPatternList.delete(pattern)
      drawPattern(pattern)
    }
    for (const envelope of selectedEnvelopeList) {
      selectedEnvelopeList.delete(envelope)
      drawEnvelope(envelope)
    }
  }
  if (envelope) {
    selectedEnvelopeList.delete(envelope)
    selectedEnvelopeList.add(envelope)
    drawSelectedEnvelope()
  }
}

export default selectEnvelope
