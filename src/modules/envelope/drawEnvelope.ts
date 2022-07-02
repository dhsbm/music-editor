import { Envelope } from '@/class'
import { workerCanvasData } from 'modules/canvas'
import { drawDot } from 'modules/dot'
import { trackData } from 'modules/track'
import { selectedEnvelopeList } from '.'

const envelopeBackgroundColor = '#637076'

/**
 * @description: 画音谱
 * @param {Envelope} envelope 要画的音谱
 * @param {boolean} [pointed] 是否被鼠标指中(是否显示缩放角标)
 * @return {void}
 */
const drawEnvelope = (envelope: Envelope, pointed = false) => {
  if (!envelope.track.hasEnvelope(envelope)) return
  if (envelope.start > workerCanvasData.rightBeat || envelope.end < workerCanvasData.leftBeat) return
  const { ctx, beatHeight, coverPixelY, beatWidth, leftBeat } = workerCanvasData
  const { track, start, width } = envelope
  const row = trackData.trackOrder.indexOf(track.trackId)
  const y = row * beatHeight - coverPixelY,
    x = (start - leftBeat) * beatWidth,
    w = width * beatWidth
  ctx.fillStyle = envelopeBackgroundColor
  ctx.fillRect(x, y, w, beatHeight)
  ctx.strokeStyle = selectedEnvelopeList.has(envelope) ? 'white' : track.color
  ctx.lineWidth = 2
  ctx.strokeRect(x + 1, y + 1, w - 2, beatHeight - 2)
  // 裁剪区域
  ctx.save()
  ctx.beginPath()
  ctx.rect(x + 1, y + 1, w - 2, beatHeight - 2)
  ctx.closePath()
  ctx.clip()
  // 写字
  ctx.font = 'normal 20px serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillStyle = 'white'
  ctx.fillText(envelope.envelopeTitle, x + 1, y + 5)

  // 画内部的点
  drawDot(envelope, y)

  // 画底部按钮
  if (pointed) {
    const y2 = y + beatHeight
    ctx.beginPath()
    ctx.moveTo(x, y2)
    ctx.arc(x, y2, 15, 0, -Math.PI / 2, true) // true 为逆时针
    const x2 = x + w
    ctx.moveTo(x2, y2)
    ctx.arc(x2, y2, 15, -Math.PI, -Math.PI / 2, false)
    ctx.fillStyle = track.color
    ctx.fill()
    ctx.closePath()
  }

  // 恢复裁剪
  ctx.restore()
}

export default drawEnvelope
