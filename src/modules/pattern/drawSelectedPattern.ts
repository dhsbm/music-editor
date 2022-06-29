import { workerCanvasData } from 'modules/canvas'
import { trackData } from 'modules/track'
import { selectedPatternList } from '.'

/**
 * @description: 画选中的音谱(加边框)
 * @return {void}
 */
const drawSelectedPattern = () => {
  if (selectedPatternList.size == 0) return
  const { ctx, beatHeight, coverPixelY, beatWidth, leftBeat } = workerCanvasData
  let x, y, width
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  for (const pattern of selectedPatternList) {
    y = trackData.trackOrder.indexOf(pattern.trackId) * beatHeight - coverPixelY
    x = (pattern.start - leftBeat) * beatWidth
    width = pattern.width * beatWidth
    ctx.strokeRect(x + 1, y + 1, width - 2, beatHeight - 2)
  }
}

export default drawSelectedPattern
