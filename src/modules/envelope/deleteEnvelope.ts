import { Envelope } from '@/class'
import { workerCanvasRender } from 'modules/canvas'
import { envelopeEditorData } from 'modules/envelope'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { selectedEnvelopeList } from '.'

/**
 * @description: 删除音谱
 * @param {Envelope} envelope 要删除的音谱
 * @param {boolean} [record] 是否要记录本次操作
 * @param {boolean} [disconnect] 是否要与绑定音轨断开连接
 * 仅在删除音轨被连带删除时为true
 * @return {null}
 */
const deleteEnvelope = (envelope: Envelope, record = true, disconnect = true) => {
  envelope.deleteSelf(disconnect)
  selectedEnvelopeList.delete(envelope)
  if (envelope.envelopeId == envelopeEditorData.envelope?.envelopeId) {
    envelopeEditorData.envelope = undefined
    envelopeEditorData.clone = undefined
  }

  if (record) {
    workerCanvasRender()
    recordHistory({
      type: HistoryType.Envelop,
      describe: '删除包络',
      target: [envelope],
    })
  }
}

export default deleteEnvelope
