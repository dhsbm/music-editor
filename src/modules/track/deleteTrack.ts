import { workerCanvasRender } from 'modules/canvas'
import { contentEditorData, patternEditorData, selectedPatternList } from 'modules/pattern'
import { recordHistory } from 'modules/history'
import { trackData, trackEditorData } from '.'
import { synthesizerData } from 'modules/synthesizer'
import { deleteEnvelope, envelopeEditorData, selectedEnvelopeList } from 'modules/envelope'
import { Track, Envelope } from '@/class'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 删除音轨
 * @param {number} trackId 要删除音轨的trackId
 * @param {boolean} record 是否要记录
 * @return {void}
 */
const deleteTrack = (trackId: number, record = true) => {
  const { trackMap, trackOrder } = trackData
  const track = <Track>trackMap.get(trackId)
  const index = trackOrder.indexOf(trackId)
  trackOrder.splice(index, 1)
  // 关闭窗口
  if (trackEditorData.track?.trackId === trackId) trackEditorData.track = undefined
  if (synthesizerData.track?.trackId === trackId) synthesizerData.track = undefined
  if (contentEditorData.pattern && track.hasPattern(contentEditorData.pattern)) {
    contentEditorData.pattern = undefined
  }
  if (patternEditorData.pattern && track.hasPattern(patternEditorData.pattern)) {
    patternEditorData.pattern = undefined
  }
  if (envelopeEditorData.envelope && track.hasEnvelope(envelopeEditorData.envelope)) {
    envelopeEditorData.envelope = undefined
  }

  // 连带删除所有绑定的包络
  for (const envelopeId of track.envelopeIdList) {
    const envelope = Envelope.getEnvelope(envelopeId)
    deleteEnvelope(envelope, false, false)
  }
  // 删除包络的同时解绑音轨
  for (const envelopeId of track.envelopeIdSet) {
    const envelope = Envelope.getEnvelope(envelopeId)
    envelope.actTrackId && envelope.actTrack.removeEnvelope(envelope)
  }
  for (const pattern of selectedPatternList) {
    if (track.hasPattern(pattern)) selectedPatternList.delete(pattern)
  }
  for (const envelope of selectedEnvelopeList) {
    if (track.hasEnvelope(envelope)) selectedEnvelopeList.delete(envelope)
  }

  // 做记录
  if (record) {
    workerCanvasRender()
    recordHistory({ type: HistoryType.Track, describe: '删除音轨', index, target: track })
  }
}

export default deleteTrack
