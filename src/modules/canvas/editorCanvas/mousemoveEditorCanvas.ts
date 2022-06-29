import { findPointNote } from 'modules/note'
import { throttle } from 'modules/tools'
import { editorCanvasData, changePrePointData } from '..'
import { mode, globalData } from 'modules/globalData'

/**
 * @description: 鼠标在编辑器画布上滑过，展示删除线/修改音节；若处于按压状态，在边缘滚动画布
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const mousemoveEditorCanvas = (e: MouseEvent) => {
  _mousemoveEditorCanvas(e)
}

const _mousemoveEditorCanvas = throttle((e: MouseEvent) => {
  if (mode.value == 3) {
    editorCanvasData.cutLineStyle.transform = `translateX(${Math.round(e.offsetX + 10)}px)`
    return
  }
  if (editorCanvasData.mobile) {
    const { beatWidth, beatHeight, totalHeight, editAreaWidth, editAreaHeight } = editorCanvasData
    if (e.offsetX < 100) {
      editorCanvasData.leftBeat = Math.max(0, editorCanvasData.leftBeat - 5 / beatWidth)
    } else if (editAreaWidth - e.offsetX < 100) {
      editorCanvasData.leftBeat = Math.min(100, editorCanvasData.leftBeat + 5 / beatWidth)
    }
    if (e.offsetY < 100) {
      editorCanvasData.coverRadioY = Math.max(0, editorCanvasData.coverRadioY - beatHeight / totalHeight / 5)
    } else if (editAreaHeight - e.offsetY < 100) {
      editorCanvasData.coverRadioY = Math.min(1, editorCanvasData.coverRadioY + beatHeight / totalHeight / 5)
    }
    return
  }
  if (globalData.pressed) return
  const { pointNote, changeStart, changeEnd } = findPointNote(e)
  changePrePointData('note', pointNote)
  if (changeStart && changeEnd) {
    editorCanvasData.style.cursor = 'default'
  } else {
    editorCanvasData.style.cursor = 'ew-resize'
  }
}, 15)

export default mousemoveEditorCanvas
