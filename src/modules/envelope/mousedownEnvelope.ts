import {
  deleteEnvelope,
  showEnvelopeMenu,
  tailorEnvelope,
  drawEnvelope,
  drawSimilarEnvelope,
  selectEnvelope,
  selectedEnvelopeList,
  findPointEnvelope,
} from '.'
import { adsorb, getSelectBox, initSelectBox, moveItem, toRange } from 'modules/tools'
import { globalData, mode } from 'modules/globalData'
import { workerCanvasData } from 'modules/canvas'
import { workerSig } from 'modules/time'
import { deleteDot, dotPromptData, dotStyle, selectDot, selectedDotList, showDotMenu } from 'modules/dot'
import { trackData } from 'modules/track'
import { recordHistory } from 'modules/history'
import { Dot, Envelope } from '@/class'

/**
 * @description: 点击包络的处理函数
 * @param {MouseEvent} e 鼠标事件对象
 * @param {Object} data 包含包络的相关数据
 * @return {void}
 */
const mousedownEnvelope = (e: MouseEvent, data: ReturnType<typeof findPointEnvelope>) => {
  const { changeStart, changeEnd, onLine, dotX, dotY } = data
  const envelope = <Envelope>data.pointEnvelope
  let dot = <Dot>data.dot
  selectEnvelope(envelope, !selectedEnvelopeList.has(envelope))
  selectDot(dot, !selectedDotList.has(dot))
  const { leftBeat, beatWidth, beatHeight, selectBoxStyle, coverPixelY } = workerCanvasData

  // 右键打开菜单
  if (e.button == 2) {
    if (dot) {
      showDotMenu(e)
    } else {
      showEnvelopeMenu(e)
    }
    return
  }

  // 在线上，操作点 裁剪模式下不可操作点
  if (onLine && mode.value != 3) {
    if (mode.value == 4 && dot) {
      deleteDot(dot)
      return
    }
    let record = true // 是否记录
    if (!dot) {
      dot = new Dot(envelope.dotDataId, dotX, dotY)
      envelope.addDot(dot)
      selectDot(dot)
      drawSimilarEnvelope(envelope)
      recordHistory({ type: 5, describe: '添加包络节点', target: [dot] })
      record = false
      dotStyle.opacity = 0
      dotPromptData.style.opacity = 1
      dotPromptData.style.left = (data.dotX + envelope.offsetX - leftBeat) * beatWidth + 10 + 'px'
      dotPromptData.style.top = data.top - 35 + 'px'
      dotPromptData.content = dot.value
    }

    const oldDotLeft = parseFloat(dotPromptData.style.left),
      oldDotTop = parseFloat(dotPromptData.style.top),
      maxDifTop = dot.y * 0.8 * beatHeight,
      minDifTop = (0.8 - dot.y * 0.8) * beatHeight,
      oldPageX = e.pageX,
      oldPageY = e.pageY
    const oldData = <{ x: number; y: number }[]>[] // 修改前的数据
    let difX = 0,
      difY = 0,
      maxX = 1000, // 向右移动的最大距离
      minX = -1000 // 向左移动的最大距离 （负数）
    for (const dot of selectedDotList) {
      oldData.push({
        x: dot.x,
        y: dot.y,
      })
      if (dot.preDot && !selectedDotList.has(dot.preDot)) {
        minX = Math.max(minX, dot.preDot.x - dot.x)
      }
      if (dot.nextDot && !selectedDotList.has(dot.nextDot)) {
        maxX = Math.min(maxX, dot.nextDot.x - dot.x)
      }
    }
    minX += 1 / 10 ** 6
    maxX -= 1 / 10 ** 6
    globalData.pressed = true
    const move = (event: MouseEvent) => {
      difX = toRange((event.pageX - oldPageX) / beatWidth, maxX, minX)
      difY = -((event.pageY - oldPageY) / beatHeight) * 1.25
      let i = 0
      for (const dot of selectedDotList) {
        dot.x = oldData[i].x + difX
        dot.y = toRange(oldData[i].y + difY, 1, 0)
        i++
      }
      drawSimilarEnvelope(envelope)

      // 修改提示
      if (dot.x + envelope.offsetX < envelope.start || dot.x + envelope.offsetX > envelope.end) {
        dotPromptData.style.opacity = 0
      } else {
        dotPromptData.style.opacity = 1
      }
      const newOffsetX = oldDotLeft + event.pageX - oldPageX
      const newOffsetY = oldDotTop + toRange(event.pageY - oldPageY, maxDifTop, -minDifTop)
      dotPromptData.style.left = newOffsetX + 'px'
      dotPromptData.style.top = newOffsetY + 'px'
      dotPromptData.content = dot.value
    }
    const moveEnd = () => {
      globalData.pressed = false
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', moveEnd)

      if (record && (Math.abs(difX) > 1 / 10 ** 5 || Math.abs(difY) > 1 / 10 ** 5)) {
        const newData = []
        for (const dot of selectedDotList) {
          newData.push({
            x: dot.x,
            y: dot.y,
          })
        }
        recordHistory({
          type: 5,
          describe: '移动包络节点',
          target: [...selectedDotList],
          oldData,
          newData,
        })
      }
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', moveEnd)
    return
  }

  // 不在线上，操作包络 / 多选点
  const sig = Math.floor((4 * 10 ** 6) / workerSig.value) / 10 ** 6
  if (mode.value == 4) {
    // 删除模式：删除目标包络
    deleteEnvelope(envelope)
  } else if (mode.value == 3) {
    // 裁剪模式：创造新包络，浅拷贝其中的内容
    const middle = adsorb(e.offsetX / beatWidth + leftBeat, sig, sig / 2)
    // 不满足裁剪条件，返回
    if (middle >= envelope.end || middle <= envelope.start) return
    tailorEnvelope(envelope, middle)
  } else if (mode.value == 2) {
    // 添加模式 拖动/修改包络
    moveItem(e, envelope, changeStart, changeEnd)
  } else {
    if (!changeStart || !changeEnd) {
      // 伸缩包络
      moveItem(e, envelope, changeStart, changeEnd)
      return
    }
    // 多选模式 多选包络节点
    const { trackOrder } = trackData
    const row = trackOrder.indexOf(envelope.track.trackId)
    const envelopY = row * beatHeight - coverPixelY
    // 选择模式：多选 点
    initSelectBox(e, selectBoxStyle)
    globalData.pressed = true
    const move = (event: MouseEvent) => {
      const { top, left, width, height } = getSelectBox(event, selectBoxStyle)
      const minY = 1 - 1.25 * ((top + height - envelopY) / beatHeight - 0.1),
        maxY = 1 - 1.25 * ((top - envelopY) / beatHeight - 0.1),
        minX = left / beatWidth + leftBeat - envelope.offsetX,
        maxX = (left + width) / beatWidth + leftBeat - envelope.offsetX

      selectDot()
      for (const dot of envelope.dotList) {
        if (dot.x >= minX) {
          if (dot.x < maxX) {
            if (dot.y >= minY && dot.y <= maxY) selectDot(dot, false)
          } else {
            break
          }
        }
      }
      drawEnvelope(envelope)
    }
    const moveEnd = () => {
      globalData.pressed = false
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', moveEnd)
      selectBoxStyle.left = '0'
      selectBoxStyle.top = '0'
      selectBoxStyle.width = '0'
      selectBoxStyle.height = '0'
      selectBoxStyle.outlineWidth = '0'
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', moveEnd)
  }
}

export default mousedownEnvelope
