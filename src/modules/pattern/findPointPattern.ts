import { workerCanvasData } from 'modules/canvas'
import { trackData } from 'modules/track'
import { toRaw } from 'vue'
import { Pattern, Track } from '@/class'

/**
 * @description: 查找指针处的音谱
 * @param {MouseEvent} e 鼠标事件对象
 * @return {object} 包含指针音谱信息的对象
 */
const findPointPattern = (e: MouseEvent) => {
  const { trackCount, trackOrder } = trackData
  const trackMap = toRaw(trackData.trackMap)
  const { beatWidth, leftBeat, beatHeight, coverPixelY } = workerCanvasData
  const x = e.offsetX / beatWidth + leftBeat
  const y = Math.max(0, e.offsetY + coverPixelY)
  if (y >= beatHeight * trackCount) {
    return { pointPattern: undefined, changeStart: true, changeEnd: true }
  }
  const row = (y / beatHeight) | 0
  const trackId = trackOrder[row]
  const patternIdSet = (<Track>trackMap.get(trackId)).patternIdSet
  for (const patternId of patternIdSet) {
    const pattern = Pattern.getPattern(patternId)
    if (pattern.start < x && pattern.end > x) {
      if ((row + 1) * beatHeight - y < 15) {
        if ((pattern.end - x) * beatWidth < 15) {
          return { pointPattern: pattern, changeStart: false, changeEnd: true }
        } else if ((x - pattern.start) * beatWidth < 15) {
          return { pointPattern: pattern, changeStart: true, changeEnd: false }
        }
      }
      return { pointPattern: pattern, changeStart: true, changeEnd: true }
    }
  }

  return { pointPattern: undefined, changeStart: true, changeEnd: true }
}

export default findPointPattern
