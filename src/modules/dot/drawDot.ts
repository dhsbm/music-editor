import { Envelope } from '@/class'
import { workerCanvasData } from 'modules/canvas'
import { getLineY, selectedDotList } from '.'
/**
 * @description: 画包络内部的点
 * @param {Envelope} envelope 要画的包络
 * @param {Number} y 要画的包络的垂直方向偏移
 * @return {void}
 */
const drawDot = (envelope: Envelope, y: number) => {
  const { ctx, beatHeight, beatWidth, leftBeat } = workerCanvasData
  const { track, start, offsetX, width, end } = envelope
  const x = (start - leftBeat) * beatWidth,
    w = width * beatWidth
  const dotList = envelope.dotList
  const length = dotList.length
  ctx.strokeStyle = envelope.track.color
  ctx.lineWidth = 1
  ctx.beginPath()
  // 画线
  if (length == 0) {
    ctx.strokeStyle = 'black'
    const offsetY = mapDotY(envelope.defaultValue) * beatHeight
    ctx.moveTo(x + 1, y + offsetY)
    ctx.lineTo(x + w - 1, y + offsetY)
  } else {
    const startLineY = getLineY(envelope, start - offsetX)
    const startY = mapDotY(startLineY) * beatHeight + y
    const endLineY = getLineY(envelope, end - offsetX)
    const endY = mapDotY(endLineY) * beatHeight + y
    ctx.moveTo(x + 1, startY)

    let preDot = <DotObj>(<unknown>undefined)
    for (const dot of dotList) {
      const dotX = (dot.x + offsetX - leftBeat) * beatWidth
      const dotY = mapDotY(dot.y) * beatHeight + y
      if (dot.x + offsetX < start) {
        preDot = { dotX, dotY }
        continue
      } else if (dot.x + offsetX > end) {
        if (envelope.type == 4) {
          drawSin(ctx, preDot, { dotX, dotY })
        }
        break
      }

      if (envelope.type == 1) {
        // 折线
        ctx.lineTo(dotX, dotY)
      } else if (envelope.type == 2) {
        // 正向水平线
        if (dot.preDot) {
          const preDotY = mapDotY(dot.preDot.y) * beatHeight + y
          ctx.lineTo(dotX, preDotY)
        } else {
          ctx.lineTo(dotX, startY)
        }
        ctx.moveTo(dotX, dotY)
      } else if (envelope.type == 3) {
        // 反向水平线
        ctx.lineTo(dotX, dotY)
        if (dot.nextDot) {
          const nextDotY = mapDotY(dot.nextDot.y) * beatHeight + y
          ctx.moveTo(dotX, nextDotY)
        }
      } else if (envelope.type == 4) {
        // 1/2正弦
        drawSin(ctx, preDot, { dotX, dotY })
        preDot = { dotX, dotY }
      }
    }

    ctx.lineTo(x + w - 1, endY)
  }
  ctx.stroke()
  ctx.closePath()

  // 画点
  for (const dot of dotList) {
    if (dot.x + offsetX < start) continue
    if (dot.x + offsetX > end) break
    const dotX = (dot.x + offsetX - leftBeat) * beatWidth
    const dotY = mapDotY(dot.y) * beatHeight
    ctx.beginPath()
    ctx.arc(dotX, y + dotY, 4, 0, 2 * Math.PI)
    ctx.fillStyle = selectedDotList.has(dot) ? 'white' : track.color
    ctx.fill()
  }
}

// 将dot.y(0-1)映射为0.1-0.9，用于页面展示
const mapDotY = (num: number) => 0.9 - num * 0.8

/**
 * @description: 接受2个坐标和画布对象，在画布上绘制出1/2正弦线段
 * @param {CanvasRenderingContext2D} ctx 画布2d对象
 * @param {DotObj} start 起始点位置
 * @param {DotObj} end 结束点位置
 * @return {void}
 */
const drawSin = (ctx: CanvasRenderingContext2D, start: DotObj, end: DotObj) => {
  if (!start) {
    ctx.lineTo(end.dotX, end.dotY)
    return
  }
  const { dotX: startX, dotY: startY } = start
  const { dotX: endX, dotY: endY } = end
  const difX = endX - startX
  const difY = endY - startY

  for (let i = 1; i <= 100; i++) {
    const dy = (1 - Math.cos((i / 100) * Math.PI)) / 2
    const dx = i / 100
    ctx.lineTo(startX + dx * difX, startY + dy * difY)
  }
}

export default drawDot

interface DotObj {
  dotX: number
  dotY: number
}
