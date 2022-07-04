import { Envelope } from '@/class'
import { Shape } from '@/class/Interface'

/**
 * @description: 获取包络的线高
 * 若在节点上，返回节点高度，若不在，计算出对应位置的y值
 * @param {Envelope} envelope 指针所在的包络
 * @param {number} x 相对的x值
 * @return {number} 线高
 */
const getLineY = (envelope: Envelope, x: number) => {
  const dotList = envelope.dotList
  const length = dotList.length

  // 定义前一点和后一点
  let preDot, nextDot

  for (let i = 0; i < length; i++) {
    const dot = dotList[i]
    if (x > dot.x) {
      preDot = dot
    } else if (x < dot.x) {
      nextDot = dot
      break
    } else {
      // 命中点
      return dot.y
    }
  }

  if (preDot && nextDot) {
    // 夹在两点之间
    const difX = x - preDot.x
    if (envelope.shape == Shape.Broken) {
      // 折线
      const y = preDot.y + difX * ((nextDot.y - preDot.y) / (nextDot.x - preDot.x))
      return y
    } else if (envelope.shape == Shape.ForwardHr) {
      // 正向水平线
      return preDot.y
    } else if (envelope.shape == Shape.reverseHr) {
      // 反向水平线
      return nextDot.y
    } else if (envelope.shape == Shape.Sine) {
      // 1/2正弦
      const difX = nextDot.x - preDot.x
      const difY = nextDot.y - preDot.y
      const dy = (1 - Math.cos(((x - preDot.x) / difX) * Math.PI)) / 2
      return preDot.y + dy * difY
    }
    return 0
  } else if (preDot) {
    // 在所有点之后
    return preDot.y
  } else if (nextDot) {
    // 在所有点之前
    return nextDot.y
  } else {
    // 没有点
    return envelope.defaultValue
  }
}

export default getLineY
