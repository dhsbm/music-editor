import { Envelope } from '@/class'
import { changeZIndex } from 'modules/tools'
import { envelopeEditorData } from '..'

/**
 * @description: 显示包络编辑器
 * @param {Envelope} envelope 要绑定的音轨
 * @return {void}
 */
const showEnvelopeEditor = (envelope: Envelope) => {
  envelopeEditorData.show = true
  envelopeEditorData.envelope = envelope
  envelopeEditorData.clone = {
    shape: envelope.shape,
    category: envelope.category,
    actTrackId: envelope.actTrackId,
    envelopeTitle: envelope.envelopeTitle,
  }
  changeZIndex(envelopeEditorData.style)
}

export default showEnvelopeEditor
