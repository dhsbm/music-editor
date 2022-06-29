import { Envelope } from '@/class'

/**
 * @description: 检查所在点是否在线上，是否有点
 * @param {Envelope} envelope 所属的包络
 * @param {number} x x值
 * @param {number} y y值
 * @param {number} xRange x的允许范围
 * @param {number} yRange y的允许范围
 * @return {object} 包含dot的信息
 */
const getDot = (envelope: Envelope, x: number, y: number, xRange: number, yRange: number) => {
  let preDot, nextDot

  for (const dot of envelope.dotList) {
    if (x - xRange > dot.x) {
      preDot = dot
    } else if (x + xRange < dot.x) {
      nextDot = dot
      break
    } else {
      // 水平方向上命中点
      if (y + yRange >= dot.y && y - yRange <= dot.y) {
        return { dot, dotY: dot.y, dotX: dot.x }
      }
    }
  }

  if (preDot && nextDot) {
    // 夹在两点之间
    const difX = x - preDot.x
    if (envelope.type == 1) {
      // 折线
      const y = preDot.y + difX * ((nextDot.y - preDot.y) / (nextDot.x - preDot.x))
      return { dot: undefined, dotY: y, dotX: x }
    } else if (envelope.type == 2) {
      // 正向水平线
      return { dot: undefined, dotY: preDot.y, dotX: x }
    } else if (envelope.type == 3) {
      // 反向水平线
      return { dot: undefined, dotY: nextDot.y, dotX: x }
    } else {
      // 1/2正弦
      const difX = nextDot.x - preDot.x
      const difY = nextDot.y - preDot.y
      const dy = (1 - Math.cos(((x - preDot.x) / difX) * Math.PI)) / 2
      return { dot: undefined, dotY: preDot.y + dy * difY, dotX: x }
    }
  } else if (preDot) {
    // 在所有点之后
    return { dot: undefined, dotY: preDot.y, dotX: x }
  } else if (nextDot) {
    // 在所有点之前
    return { dot: undefined, dotY: nextDot.y, dotX: x }
  } else {
    // 没有点
    return { dot: undefined, dotY: envelope.defaultValue, dotX: x }
  }
}

export default getDot
