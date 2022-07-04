import { changeDotStyle } from 'modules/dot'
import { findPointEnvelope } from 'modules/envelope'
import { globalData, mode } from 'modules/globalData'
import { Mode } from 'modules/globalData/Interface'
import { findPointPattern } from 'modules/pattern'
import { throttle } from 'modules/tools'
import { workerCanvasData, changePrePointData } from '..'

/**
 * @description: 鼠标在工作区画布上滑过，展示删除线/音节角标；若处于按压状态，在边缘滚动画布
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const mousemoveWorkerCanvas = (e: MouseEvent) => {
  _mousemoveWorkerCanvas(e)
}

const _mousemoveWorkerCanvas = throttle((e: MouseEvent) => {
  if (mode.value == Mode.Tailor) {
    workerCanvasData.cutLineStyle.transform = `translateX(${Math.round(e.offsetX + 10)}px)`
    return
  }
  if (workerCanvasData.mobile) {
    const { beatWidth, totalHeight, beatHeight, editAreaWidth, editAreaHeight } = workerCanvasData
    const { scrollbarHide } = workerCanvasData
    if (e.offsetX < 100) {
      workerCanvasData.leftBeat = Math.max(0, workerCanvasData.leftBeat - 5 / beatWidth)
    } else if (editAreaWidth - e.offsetX < 100) {
      workerCanvasData.leftBeat = Math.min(100, workerCanvasData.leftBeat + 5 / beatWidth)
    }
    if (e.offsetY < 100 && scrollbarHide == false) {
      workerCanvasData.coverRadioY = Math.max(0, workerCanvasData.coverRadioY - beatHeight / totalHeight / 5)
    } else if (editAreaHeight - e.offsetY < 100 && scrollbarHide == false) {
      workerCanvasData.coverRadioY = Math.min(1, workerCanvasData.coverRadioY + beatHeight / totalHeight / 5)
    }
    return
  }

  // 鼠标处于按下状态，返回
  if (globalData.pressed) return
  const patternData = findPointPattern(e)
  changePrePointData('pattern', patternData.pointPattern)

  const envelopeData = findPointEnvelope(e)
  changePrePointData('envelope', envelopeData.pointEnvelope)
  changeDotStyle(envelopeData)

  if (patternData.changeStart && patternData.changeEnd && envelopeData.changeStart && envelopeData.changeEnd) {
    workerCanvasData.style.cursor = 'default'
  } else {
    workerCanvasData.style.cursor = 'ew-resize'
  }
}, 15)

export default mousemoveWorkerCanvas
