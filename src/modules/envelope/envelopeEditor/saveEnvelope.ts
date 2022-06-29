import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { drawSimilarEnvelope, envelopeEditorData } from '..'
import { Track } from '@/class'

/**
 * @description: 保存音谱参数的修改
 * @return {void}
 */
const saveEnvelope = () => {
  const { clone, envelope } = envelopeEditorData
  const difference = []
  if (clone && envelope) {
    for (const key of <[]>Object.keys(clone)) {
      if (envelope[key] != clone[key]) {
        if (key == 'actTrackId') {
          envelope[key] != 0 && Track.getTrack(envelope.actTrackId).removeEnvelope(envelope)
          clone[key] != 0 && Track.getTrack(clone.actTrackId).actEnvelope(envelope)
        }
        difference.push({
          key,
          oldData: envelope[key],
          newData: clone[key],
        })
        envelope[key] = clone[key]
      }
    }
    drawSimilarEnvelope(envelope)
  }

  if (difference.length > 0) {
    recordHistory({
      type: 4,
      describe: '修改包络参数',
      target: toRaw(envelope),
      difference,
    })
  }
}

export default saveEnvelope
