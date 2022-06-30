import { Envelope } from '@/class'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { drawEnvelope, selectEnvelope } from '.'

/**
 * @description: 裁剪包络
 * @param {Envelope} envelope 要裁剪的包络
 * @param {Number} middle 裁剪的位置
 * @return {void}
 */
const tailorEnvelope = (envelope: Envelope, middle: number) => {
  const newEnvelope = envelope.clone()
  envelope.end = middle
  newEnvelope.start = middle
  newEnvelope.addSelf()
  drawEnvelope(newEnvelope)
  selectEnvelope(newEnvelope)
  recordHistory({
    type: HistoryType.Envelop,
    describe: '裁剪包络',
    target: envelope,
    target2: newEnvelope,
  })
}

export default tailorEnvelope
