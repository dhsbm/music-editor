import { canvasData } from '.'
import { CanvasData } from './Interface'

const { lineWidth, lineColor } = canvasData

/**
 * @description: 画编辑区画布竖线
 * @param {HTMLCanvasElement} canvas 画布对象
 * @param {CanvasData} canvasData 画布相关数据
 * @return {void}
 */
const drawVerticalLines = (canvas: HTMLCanvasElement, canvasData: CanvasData) => {
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
  const { beatWidth, leftBeat } = canvasData
  const initialValue = Math.floor(leftBeat) // 最左边是第几段
  const remainPixel = ((initialValue + 1 - leftBeat) % 1) * beatWidth // 上一段的剩余px
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.font = '10px sans-serif'
  ctx.beginPath()
  for (let i = -1; i * beatWidth < canvas.width; i++) {
    const offsetX = i * beatWidth + remainPixel
    ctx.moveTo(offsetX, 0)
    ctx.lineTo(offsetX, canvas.height)
  }
  ctx.stroke()
  ctx.closePath()
}
// 这里不能节流，不然可能会覆盖乐谱
export default drawVerticalLines
