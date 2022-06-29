import { workerCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { deleteEnvelope, selectedEnvelopeList } from '.'

/**
 * @description: 删除选择区所有音节
 * @return {void}
 */
const deleteSelectedEnvelope = () => {
  if (selectedEnvelopeList.size == 0) return
  recordHistory({ type: 2, describe: '删除音谱', target: [...selectedEnvelopeList] })
  for (const envelope of selectedEnvelopeList) {
    deleteEnvelope(envelope, false)
  }
  selectedEnvelopeList.clear()
  workerCanvasRender()
}

export default deleteSelectedEnvelope
