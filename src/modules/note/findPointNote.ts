import { toRaw } from 'vue'
import { editorCanvasData } from 'modules/canvas'
import { contentEditorData } from 'modules/pattern'
import { Pattern } from '@/class'

/**
 * @description: 查找指针处的音节
 * @param {MouseEvent} e 鼠标事件对象
 * @return {object} 包含指针处音节信息的对象
 */
const findPointNote = (e: MouseEvent) => {
  const { beatWidth, beatHeight, leftBeat, coverPixelY } = editorCanvasData
  const pattern = <Pattern>toRaw(contentEditorData.pattern)
  const x = e.offsetX / beatWidth + leftBeat - pattern.offsetX
  const y = e.offsetY + coverPixelY
  const row = (y / beatHeight) | 0
  const noteSet = pattern.getNotes(row)

  if (noteSet) {
    for (const note of noteSet) {
      if (note.start < x && note.end > x) {
        if ((note.end - x) * beatWidth < 5) {
          return { pointNote: note, changeStart: false, changeEnd: true }
        } else {
          return { pointNote: note, changeStart: true, changeEnd: true }
        }
      }
    }
  }
  return { pointNote: undefined, changeStart: true, changeEnd: true }
}

export default findPointNote
