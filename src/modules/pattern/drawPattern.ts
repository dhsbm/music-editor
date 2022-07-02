import { editorCanvasData, workerCanvasData } from 'modules/canvas'
import { trackData } from 'modules/track'
import { selectedPatternList } from '.'
import { Pattern } from '@/class'

const patternBackgroundColor = '#4c565f'

/**
 * @description: 画音谱
 * @param {Pattern} pattern 要画的音谱
 * @param {boolean} [pointed] 是否被鼠标指中(是否显示缩放角标)
 * @return {void}
 */
const drawPattern = (pattern: Pattern, pointed = false) => {
  if (!pattern.track.hasPattern(pattern)) return
  if (pattern.start > workerCanvasData.rightBeat || pattern.end < workerCanvasData.leftBeat) return
  const { ctx, beatHeight, coverPixelY, beatWidth, leftBeat } = workerCanvasData
  const { track, noteMap, start, offsetX, width } = pattern
  const row = trackData.trackOrder.indexOf(track.trackId)
  const y = row * beatHeight - coverPixelY,
    x = (start - leftBeat) * beatWidth,
    w = width * beatWidth
  ctx.fillStyle = patternBackgroundColor
  ctx.fillRect(x, y, w, beatHeight)
  ctx.strokeStyle = selectedPatternList.has(pattern) ? 'white' : track.color
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
  ctx.fillText('音谱', x + 1, y + 5)

  // 画内部音节
  ctx.strokeStyle = track.color
  ctx.lineWidth = (beatHeight - 4) / editorCanvasData.totalRows
  ctx.beginPath()
  for (const [row, notes] of noteMap) {
    for (const note of notes) {
      if (note.start + offsetX > start + width || note.end + offsetX < start) continue
      const startX = (note.start + offsetX - leftBeat) * beatWidth
      const endX = startX + note.width * beatWidth
      ctx.moveTo(startX, y + (row * beatHeight) / editorCanvasData.totalRows + 1)
      ctx.lineTo(endX, y + (row * beatHeight) / editorCanvasData.totalRows + 1)
    }
  }
  ctx.stroke()
  ctx.closePath()

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

export default drawPattern
