import { Dot, Envelope } from '@/class'
import { workerCanvasData } from 'modules/canvas'
import { drawSimilarEnvelope } from 'modules/envelope'
import { recordHistory } from 'modules/history'
import { toRange } from 'modules/tools'
import { selectDot } from '.'

/**
 * @description: 添加包络点
 * @param {MouseEvent} e 鼠标事件对象
 * @param {Envelope} envelope 点所在的包络
 * @return {Dot} 返回添加的点
 */
const addDot = (e: MouseEvent, envelope: Envelope) => {
  const { beatWidth, leftBeat, beatHeight, coverPixelY } = workerCanvasData
  const x = e.offsetX / beatWidth + leftBeat - envelope.offsetX
  const pointY = toRange(((e.offsetY + coverPixelY) % beatHeight) / beatHeight, 0.9, 0.1)
  const y = 1 - (pointY - 0.1) * 1.25

  const dot = new Dot(envelope.dotDataId, x, y)
  envelope.addDot(dot)
  selectDot(dot)
  drawSimilarEnvelope(envelope)
  recordHistory({ type: 5, describe: '添加包络节点', target: [dot] })
  return dot
}

export default addDot
