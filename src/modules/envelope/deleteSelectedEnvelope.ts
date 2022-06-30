import { workerCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { deleteEnvelope, selectedEnvelopeList } from '.'

/**
 * @description: 删除选择区所有包络
 * @return {void}
 */
const deleteSelectedEnvelope = () => {
  if (selectedEnvelopeList.size == 0) return
  recordHistory({ type: HistoryType.Envelop, describe: '删除包络', target: [...selectedEnvelopeList] })
  for (const envelope of selectedEnvelopeList) {
    deleteEnvelope(envelope, false)
  }
  selectedEnvelopeList.clear()
  workerCanvasRender()
}

export default deleteSelectedEnvelope
