import { envelopeEditorData } from '..'

/**
 * @description: 隐藏包络编辑器
 * @return {void}
 */
const hideEnvelopeEditor = () => {
  envelopeEditorData.envelope = undefined
  envelopeEditorData.clone = undefined
  envelopeEditorData.show = false
}

export default hideEnvelopeEditor
