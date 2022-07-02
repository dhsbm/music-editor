import { Note, Pattern } from '@/class'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { selectedNoteList, selectNote } from 'modules/note'
import { contentEditorData } from 'modules/pattern'
import { editorCanvasRender } from '..'

let clipboard: Note[] = []
let maxWidth = 0

/**
 * @description: 编辑器画布键盘事件 复制粘贴
 * @param {KeyboardEvent} e 键盘事件对象
 * @return {void}
 */
const keydownEditorCanvas = (e: KeyboardEvent) => {
  if (!e.ctrlKey) return
  const key = e.key.toLocaleLowerCase()
  if (key === 'c') {
    // 复制操作 shift按下时为 深拷贝
    clipboard = []
    maxWidth = 0
    for (const note of selectedNoteList) {
      clipboard.push(note.clone())
      maxWidth = Math.max(maxWidth, note.width)
    }
  } else if (key === 'v') {
    // 粘贴操作 shift按下时为 深拷贝
    selectNote() // 清空选择区
    const target = []
    const noteData = (<Pattern>contentEditorData.pattern).noteData
    for (const note of clipboard) {
      note.start += maxWidth
      note.end += maxWidth
      const clone = note.clone()
      target.push(clone)
      clone.noteDataId = noteData.noteDataId
      clone.noteData.setNote(clone)
      selectNote(clone, false)
    }

    if (clipboard.length > 0)
      recordHistory({
        type: HistoryType.Note,
        describe: '粘贴音节',
        target,
      })

    editorCanvasRender()
  }
}

export default keydownEditorCanvas
