import { drawAllTrack } from 'modules/track'
import { throttle } from 'modules/tools'
import { drawVerticalLines, drawHorizontalLines, workerCanvasData } from '..'

/**
 * @description: 工作区画布总渲染函数
 * @param {null}
 * @return {null}
 */
const workerCanvasRender = () => {
  _workerCanvasRender()
}

const _workerCanvasRender = throttle(() => {
  const { canvas, ctx } = workerCanvasData
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawVerticalLines(canvas, workerCanvasData)
  drawHorizontalLines(canvas, workerCanvasData)
  drawAllTrack()
}, 15)
export default workerCanvasRender
