import { globalData } from 'modules/globalData'
import { CanvasData } from './Interface'
/**
 * @description: 滚动/缩放画布
 * @param {WheelEvent} e 鼠标滚动事件
 * @param {CanvasData} canvasData 要修改的画布数据
 * @return {void}
 */
const rollCanvas = (e: WheelEvent, canvasData: CanvasData) => {
  // 在canvas中滚动
  if (globalData.shift) {
    // 横向操作
    if (globalData.ctrl) {
      // 缩放
      const { beatWidth, minBeatWidth, maxBeatWidth } = canvasData
      if (e.deltaY < 0) {
        canvasData.beatWidth = Math.max(minBeatWidth, beatWidth - 2)
      } else {
        canvasData.beatWidth = Math.min(maxBeatWidth, beatWidth + 2)
      }
    } else {
      // 滚动
      const { leftBeat, beatWidth, editAreaWidth } = canvasData
      if (e.deltaY < 0) {
        canvasData.leftBeat = Math.max(0, leftBeat - editAreaWidth / (10 * beatWidth))
      } else {
        canvasData.leftBeat = Math.min(100, leftBeat + editAreaWidth / (10 * beatWidth))
      }
    }
  } else {
    // 纵向操作
    if (globalData.ctrl) {
      // 缩放
      const { beatHeight, minBeatHeight, maxBeatHeight } = canvasData
      if (e.deltaY < 0) {
        canvasData.beatHeight = Math.max(minBeatHeight, beatHeight - 1)
      } else {
        canvasData.beatHeight = Math.min(maxBeatHeight, beatHeight + 1)
      }
    } else {
      // 滚动
      const { coverRadioY } = canvasData
      if (canvasData.scrollbarHide) return
      if (e.deltaY < 0) {
        canvasData.coverRadioY = Math.max(0, coverRadioY - 0.05)
      } else {
        canvasData.coverRadioY = Math.min(1, coverRadioY + 0.05)
      }
    }
  }
}

export default rollCanvas
