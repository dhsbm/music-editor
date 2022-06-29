import { workerCanvasData } from 'modules/canvas'
import { trackData } from 'modules/track'
import { selectedEnvelopeList } from '.'

/**
 * @description: 画选中的音谱(加边框)
 * @return {void}
 */
const drawSelectedEnvelope = () => {
  if (selectedEnvelopeList.size == 0) return
  const { ctx, beatHeight, coverPixelY, beatWidth, leftBeat } = workerCanvasData
  let x, y, width
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  for (const envelope of selectedEnvelopeList) {
    y = trackData.trackOrder.indexOf(envelope.trackId) * beatHeight - coverPixelY
    x = (envelope.start - leftBeat) * beatWidth
    width = envelope.width * beatWidth
    ctx.strokeRect(x + 1, y + 1, width - 2, beatHeight - 2)
  }
}

export default drawSelectedEnvelope
