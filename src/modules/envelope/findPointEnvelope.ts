import { workerCanvasData } from 'modules/canvas'
import { getDot } from 'modules/dot'
import { toRange } from 'modules/tools'
import { trackData } from 'modules/track'
import { toRaw } from 'vue'
import { Envelope, Track, Dot } from '@/class'

/**
 * @description: 查找指针处的音谱
 * @param {MouseEvent} e 鼠标事件对象
 * @return {object} 包含指针音谱信息的对象
 */
const findPointEnvelope = (e: MouseEvent) => {
  const result: Result = {
    pointEnvelope: undefined,
    changeStart: true,
    changeEnd: true,
    onLine: false,
    left: 0,
    top: 0,
    dot: undefined,
    dotY: 0,
    dotX: 0,
  }
  const { trackCount, trackOrder } = trackData
  const trackMap = toRaw(trackData.trackMap)
  const { beatWidth, leftBeat, beatHeight, coverPixelY } = workerCanvasData
  const x = e.offsetX / beatWidth + leftBeat
  const y = Math.max(0, e.offsetY + coverPixelY)
  if (y >= beatHeight * trackCount) {
    return result
  }
  const row = (y / beatHeight) | 0
  const trackId = trackOrder[row]
  const envelopeIdSet = (<Track>trackMap.get(trackId)).envelopeIdSet
  for (const envelopeId of envelopeIdSet) {
    const envelope = Envelope.getEnvelope(envelopeId)
    if (envelope.start < x && envelope.end > x) {
      result.pointEnvelope = envelope
      // 拉伸包络
      if ((row + 1) * beatHeight - y < 15) {
        if ((envelope.end - x) * beatWidth < 15) {
          result.changeStart = false
          result.changeEnd = true
          return result
        } else if ((x - envelope.start) * beatWidth < 15) {
          result.changeStart = true
          result.changeEnd = false
          return result
        }
      }

      // 检测是否在线上
      const pointY = toRange((y % beatHeight) / beatHeight, 0.9, 0.1)
      const dotX = x - envelope.offsetX
      const dotY = 1 - (pointY - 0.1) * 1.25
      // 需要传入鼠标的x,y,xRange,yRange
      const data = getDot(envelope, dotX, dotY, 4 / beatWidth, 4 / beatHeight)
      const lineY = 0.9 - data.dotY * 0.8

      if (Math.abs((lineY + row) * beatHeight - y) < 5) {
        return {
          pointEnvelope: envelope,
          changeStart: true,
          changeEnd: true,
          onLine: true,

          left: e.offsetX + 10,
          top: (lineY + row) * beatHeight,
          ...data,
        }
      }

      return result
    }
  }

  return result
}

export default findPointEnvelope

interface Result {
  pointEnvelope: Envelope | undefined
  changeStart: boolean
  changeEnd: boolean
  onLine: boolean

  left: number
  top: number
  dot: Dot | undefined
  dotY: number
  dotX: number
}
