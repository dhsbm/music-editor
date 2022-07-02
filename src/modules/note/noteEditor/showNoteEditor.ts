import { Note } from '@/class'
import { changeZIndex } from 'modules/tools'
import { noteEditorData } from '..'

/**
 * @description: 打开音节编辑器
 * @param {Note} note 要绑定的音节
 * @return {void}
 */
const showNoteEditor = (note: Note) => {
  noteEditorData.show = true
  noteEditorData.note = note
  noteEditorData.clone = { volume: note.volume }
  changeZIndex(noteEditorData.style)
}

export default showNoteEditor
