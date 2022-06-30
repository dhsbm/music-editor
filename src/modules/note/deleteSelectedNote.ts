import { editorCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { deleteNote, selectedNoteList } from '.'

/**
 * @description: 删除选择区所有音节
 * @return {void}
 */
const deleteSelectedNote = () => {
  if (selectedNoteList.size == 0) return
  recordHistory({ type: HistoryType.Note, describe: '删除音节', target: [...selectedNoteList] })
  for (const note of selectedNoteList) {
    deleteNote(note, false)
  }
  selectedNoteList.clear()
  editorCanvasRender()
}

export default deleteSelectedNote
