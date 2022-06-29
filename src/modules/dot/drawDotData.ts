import { DotData, Envelope } from '@/class'
import { drawEnvelope } from 'modules/envelope'

/**
 * @description: 绘制所有同数据的包络
 * @param {DotData} dotData 要绘制的数据源
 * @return {void}
 */
const drawDotData = (dotData: DotData) => {
  for (const envelopeId of dotData.envelopeIdSet) {
    drawEnvelope(Envelope.getEnvelope(envelopeId))
  }
}

export default drawDotData
