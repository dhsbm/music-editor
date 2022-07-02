import { canvasData } from '.'
import { CanvasData } from './Interface'

const { lineWidth, lineColor } = canvasData

/**
 * @description: 画横线
 * @param {HTMLCanvasElement} canvas 画布对象
 * @param {CanvasData} canvasData 画布相关数据
 * @return {void}
 */
const drawHorizontalLines = (canvas: HTMLCanvasElement, canvasData: CanvasData) => {
  const ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
  const { beatHeight, coverPixelY, totalRows } = canvasData
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.beginPath()
  for (let i = 1; i <= totalRows; i++) {
    const y = i * beatHeight - coverPixelY
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
  }
  ctx.stroke()
  ctx.closePath()
}

export default drawHorizontalLines
