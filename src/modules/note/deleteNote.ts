import { editorCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { selectedNoteList, noteEditorData } from '.'
import { Note } from '@/class'
import { HistoryType } from 'modules/history/Interface'
import { toRaw } from 'vue'

/**
 * @description: 删除音节
 * @param {Note} note 要删除的音节
 * @param {boolean} [record] 是否要记录本次操作
 * @return {boolean}
 */
const deleteNote = (note: Note, record = true) => {
  note.deleteSelf()
  selectedNoteList.delete(note)

  if (note == toRaw(noteEditorData.note)) {
    noteEditorData.note = undefined
    noteEditorData.clone = undefined
  }
  // 做记录
  if (record) {
    editorCanvasRender()
    recordHistory({
      type: HistoryType.Note,
      describe: '删除音节',
      target: [note],
    })
  }
}

export default deleteNote
