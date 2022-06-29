import { editorCanvasData } from 'modules/canvas'
import { contentEditorData } from 'modules/pattern'
import { Note, Pattern } from '@/class'

/**
 * @description: 画音节
 * @param {Note} note 要绘制的音节
 * @return {void}
 */
const drawNote = (note: Note) => {
  if (!note.noteData.hasNote(note)) return
  const { ctx, beatWidth, beatHeight, coverPixelY, leftBeat } = editorCanvasData
  const pattern = <Pattern>contentEditorData.pattern

  const { row, start, width } = note
  const y = row * beatHeight - coverPixelY,
    x = (start + pattern.offsetX - leftBeat) * beatWidth,
    w = width * beatWidth
  ctx.fillStyle = pattern.track.color
  ctx.fillRect(x, y, w, beatHeight)
  ctx.strokeStyle = '#4c565f'
  ctx.lineWidth = 1
  ctx.strokeRect(x, y, w, beatHeight)
}

export default drawNote
