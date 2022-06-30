import { Envelope } from '@/class'
import { selectEnvelope, drawSelectedEnvelope } from '.'

/**
 * @description: 选择所有公用一份音节数据的音谱
 * @param {Envelope} envelope 样本音谱
 * @return {void}
 */
const selectSimilarEnvelope = (envelope: Envelope) => {
  selectEnvelope() // 清空选区
  for (const envelopeId of envelope.dotData.envelopeIdSet) {
    selectEnvelope(Envelope.getEnvelope(envelopeId), false)
  }
  drawSelectedEnvelope()
}

export default selectSimilarEnvelope
