import { drawDotData } from 'modules/dot'
import { Envelope } from '@/class'

/**
 * @description: 绘制所有同源音谱
 * @param {Envelope} envelope 样本音谱
 * @return {void}
 */
const drawSimilarEnvelope = (envelope: Envelope) => {
  drawDotData(envelope.dotData)
}

export default drawSimilarEnvelope
