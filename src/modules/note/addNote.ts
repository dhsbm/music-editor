import { editorCanvasData } from 'modules/canvas'
import { contentEditorData, drawSimilarPattern } from 'modules/pattern'
import { recordHistory } from 'modules/history'
import { editorSig } from 'modules/time'
import { toMultiple } from 'modules/tools'
import { selectNote, drawNote } from '.'
import { Note, Pattern } from '@/class'

/**
 * @description: 添加音节
 * @param {MouseEvent} e 鼠标事件对象
 * @return {Note} 返回添加的音节
 */
const addNote = (e: MouseEvent) => {
  const { beatWidth, beatHeight, leftBeat, coverPixelY } = editorCanvasData
  const pattern = <Pattern>contentEditorData.pattern
  const x = toMultiple(e.offsetX / beatWidth + leftBeat - pattern.offsetX, 4 / editorSig.value)
  const y = e.offsetY + coverPixelY
  const row = (y / beatHeight) | 0
  const note = new Note(pattern.noteDataId, row, x, x + 4 / editorSig.value)
  note.addSelf()
  drawNote(note)
  selectNote(note)
  drawSimilarPattern(pattern)
  // 做记录
  recordHistory({ type: 3, describe: '添加音节', target: [note] })
  return note
}

export default addNote
