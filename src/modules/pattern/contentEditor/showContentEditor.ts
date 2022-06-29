import { nextTick } from 'vue'
import { drawPiano, editorCanvasData, editorCanvasRender } from 'modules/canvas'
import { contentEditorData } from '..'
import { Pattern } from '@/class'

/**
 * @description: 显示音谱编辑器
 * @param {Pattern} pattern 要绑定的音谱
 * @return {void}
 */
const showContentEditor = (pattern: Pattern) => {
  contentEditorData.show = true
  contentEditorData.pattern = pattern
  if (!pattern) return
  nextTick(() => {
    editorCanvasData.leftBeat = pattern.start
    editorCanvasRender()
    drawPiano()
  })
}

export default showContentEditor
