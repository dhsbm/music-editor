import { editorCanvasData } from 'modules/canvas'
import { selectedNoteList } from '.'
import { contentEditorData } from 'modules/pattern'
import { Pattern } from '@/class'

/**
 * @description: 画选中的音节框
 * @return {void}
 */
const drawSelectedNote = () => {
  if (selectedNoteList.size == 0) return
  const { ctx, beatWidth, beatHeight, coverPixelY, leftBeat } = editorCanvasData
  const pattern = <Pattern>contentEditorData.pattern
  let x, y, width
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  for (const note of selectedNoteList) {
    y = note.row * beatHeight - coverPixelY
    x = (note.start + pattern.offsetX - leftBeat) * beatWidth
    width = note.width * beatWidth
    ctx.strokeRect(x + 1, y + 1, width - 2, beatHeight - 2)
  }
}

export default drawSelectedNote
