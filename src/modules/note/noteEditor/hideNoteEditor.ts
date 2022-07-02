import { noteEditorData } from '..'

/**
 * @description: 隐藏音节编辑器
 * @return {void}
 */
const hideNoteEditor = () => {
  noteEditorData.note = undefined
  noteEditorData.clone = undefined
  noteEditorData.show = false
}

export default hideNoteEditor
