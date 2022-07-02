import { contentEditorData, drawSimilarPattern } from 'modules/pattern'
import { drawAllNote, drawSelectedNote } from 'modules/note'
import { throttle } from 'modules/tools'
import { drawHorizontalLines, drawVerticalLines, editorCanvasData } from '..'
import { toRaw } from 'vue'

/**
 * @description: 内容编辑器画布总渲染函数
 * @return {void}
 */
const editorCanvasRender = () => {
  _editorCanvasRender()
}

const _editorCanvasRender = throttle(() => {
  const pattern = toRaw(contentEditorData.pattern)
  if (!pattern) return
  const { canvas, ctx } = editorCanvasData
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawVerticalLines(canvas, editorCanvasData)
  drawHorizontalLines(canvas, editorCanvasData)
  drawAllNote()
  drawSelectedNote()
  drawSimilarPattern(pattern)
}, 15)

export default editorCanvasRender
