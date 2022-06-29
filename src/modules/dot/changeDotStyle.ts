import { findPointEnvelope } from 'modules/envelope'
import { workerCanvasData } from 'modules/canvas'
import { dotPromptData, dotStyle } from '.'
/**
 * @description: 改变小圆点样式
 * @param {any} data 由findPointEnvelope生成的包络点的数据
 * @return {void}
 */
const changeDotStyle = (data: ReturnType<typeof findPointEnvelope>) => {
  const { beatWidth, leftBeat } = workerCanvasData
  if (data.pointEnvelope && data.onLine) {
    dotStyle.opacity = 0.5
    dotStyle.left = data.left + 'px'
    dotStyle.top = data.top + 'px'
    if (data.dot) {
      dotStyle.opacity = 0
      dotPromptData.style.opacity = 1
      dotPromptData.style.left = (data.dotX + data.pointEnvelope.offsetX - leftBeat) * beatWidth + 10 + 'px'
      dotPromptData.style.top = data.top - 35 + 'px'
      dotPromptData.content = data.dot.value
    } else {
      dotPromptData.style.opacity = 0
    }
  } else {
    dotStyle.opacity = 0
    dotPromptData.style.opacity = 0
  }
}

export default changeDotStyle
