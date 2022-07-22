import { recordHistory } from 'modules/history'
import { Envelope } from '@/class'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 使音谱的数据独立
 * @param {Envelope} envelope 要独立的音谱
 * @return {void}
 */
const independEnvelope = (envelope: Envelope) => {
  const dotData = envelope.dotData
  const newDotData = dotData.clone()
  dotData.deleteEnvelope(envelope)
  envelope.dotData = newDotData
  newDotData.addEnvelope(envelope)
  console.log(dotData === newDotData)
  recordHistory({
    type: HistoryType.Envelop,
    describe: '独立包络',
    target: envelope,
    oldDotData: dotData,
    newDotData: newDotData,
  })
}

export default independEnvelope
