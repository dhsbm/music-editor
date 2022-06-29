// 复用移动音谱/包络的代码
import { selectedPatternList, contentEditorData } from 'modules/pattern'
import { recordHistory } from 'modules/history'
import { indicatorData } from 'modules/indicator'
import { adsorb, throttle, toMultiple, toRange } from 'modules/tools'
import { workerCanvasData, workerCanvasRender, editorCanvasRender } from 'modules/canvas'
import { workerSig } from 'modules/time'
import { trackData } from 'modules/track'
import { toRaw } from 'vue'
import { selectedEnvelopeList } from 'modules/envelope'
import { globalData } from 'modules/globalData'
import { Pattern, Envelope } from '@/class'
/**
 * @description: 移动/伸缩 音谱/包络
 * @param {MouseEvent} e 鼠标事件对象
 * @param {Pattern|Envelope} item 鼠标所指的音谱/包络
 * @param {boolean} changeStart 是否修改起始位置
 * @param {boolean} changeEnd 是否修改结束位置
 * @return {void}
 */
const moveItem = (e: MouseEvent, item: Pattern | Envelope, changeStart: boolean, changeEnd: boolean) => {
  const { beatWidth, beatHeight, coverPixelY, leftBeat, difHeight } = workerCanvasData
  const { trackOrder, trackCount } = trackData
  const sig = Math.floor((4 * 10 ** 6) / workerSig.value) / 10 ** 6
  indicatorData.start = item.start

  const oldPageX = e.pageX,
    oldPageY = e.pageY,
    oldPatternData = <Data[]>[], // 修改前的数据
    oldEnvelopeData = <Data[]>[] // 修改前的数据
  let difX = 0, // 水平方向上像素差
    difRow = 0, // 垂直方向上行数差
    preRow = 0, // 之前的行数差
    minRow = trackCount - 1, // 最小的行数
    maxRow = 0, // 最大行数
    minWidth = 10000, // 最小宽度
    minStart = 10000 // 最小初始位置
  const needRender = selectedPatternList.has(<Pattern>toRaw(contentEditorData.pattern))

  // 循环选择区，记录原始值
  for (const pattern of selectedPatternList) {
    oldPatternData.push({
      start: pattern.start,
      end: pattern.end,
      row: trackOrder.indexOf(pattern.trackId),
      offsetX: pattern.offsetX,
    })
    minRow = Math.min(minRow, trackOrder.indexOf(pattern.trackId))
    maxRow = Math.max(maxRow, trackOrder.indexOf(pattern.trackId))
    minWidth = Math.min(minWidth, pattern.width)
    minStart = Math.min(minStart, pattern.start)
  }
  for (const envelope of selectedEnvelopeList) {
    oldEnvelopeData.push({
      start: envelope.start,
      end: envelope.end,
      row: trackOrder.indexOf(envelope.trackId),
      offsetX: envelope.offsetX,
    })
    minRow = Math.min(minRow, trackOrder.indexOf(envelope.trackId))
    maxRow = Math.max(maxRow, trackOrder.indexOf(envelope.trackId))
    minWidth = Math.min(minWidth, envelope.width)
    minStart = Math.min(minStart, envelope.start)
  }
  globalData.pressed = true
  workerCanvasData.mobile = true
  const move = throttle((event: MouseEvent) => {
    difX = adsorb((event.pageX - oldPageX) / beatWidth + workerCanvasData.leftBeat - leftBeat, sig, sig / 2)
    // 拖动音谱
    if (changeStart && changeEnd) {
      const newRow = (event.pageY - oldPageY + workerCanvasData.coverRadioY * difHeight - coverPixelY) / beatHeight
      difRow = toRange(Math.round(newRow), trackCount - 1 - maxRow, -minRow)
    }
    if (changeStart && difX <= -minStart) difX = -toMultiple(minStart, sig)
    if (changeStart && !changeEnd) {
      if (difX >= minWidth) difX = minWidth % sig == 0 ? toMultiple(minWidth - sig, sig) : toMultiple(minWidth, sig)
    }
    if (changeEnd && !changeStart) {
      if (difX <= -minWidth) difX = minWidth % sig == 0 ? -toMultiple(minWidth - sig, sig) : -toMultiple(minWidth, sig)
    }

    let i = 0
    for (const pattern of selectedPatternList) {
      if (changeStart) pattern.start = oldPatternData[i].start + difX
      if (changeEnd) pattern.end = oldPatternData[i].end + difX
      if (changeStart && changeEnd) pattern.offsetX = oldPatternData[i].offsetX + difX
      if (difRow != preRow) {
        pattern.track.deletePattern(pattern)
        pattern.trackId = trackOrder[oldPatternData[i].row + difRow]
        pattern.track.addPattern(pattern)
      }
      i++
    }
    let j = 0
    for (const envelope of selectedEnvelopeList) {
      if (changeStart) envelope.start = oldEnvelopeData[j].start + difX
      if (changeEnd) envelope.end = oldEnvelopeData[j].end + difX
      if (changeStart && changeEnd) envelope.offsetX = oldEnvelopeData[j].offsetX + difX
      if (difRow != preRow) {
        envelope.track.deleteEnvelope(envelope)
        envelope.trackId = trackOrder[oldEnvelopeData[j].row + difRow]
        envelope.track.addEnvelope(envelope)
      }
      j++
    }
    preRow = difRow
    workerCanvasRender()
    if (needRender) {
      // 更新内容编辑区
      editorCanvasRender()
      const pre = contentEditorData.pattern
      contentEditorData.pattern = undefined
      contentEditorData.pattern = pre
    }
  }, 15)

  const moveEnd = () => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
    workerCanvasData.mobile = false
    globalData.pressed = false

    // 做记录
    if (selectedPatternList.size > 0 && (difX != 0 || difRow != 0)) {
      recordHistory({
        type: 2,
        describe: changeStart && changeEnd ? '移动音谱' : '伸缩音谱',
        target: [...selectedPatternList],
        difX,
        difRow,
        changeStart,
        changeEnd,
      })
    }
    if (selectedEnvelopeList.size > 0 && (difX != 0 || difRow != 0)) {
      recordHistory({
        type: 4,
        describe: changeStart && changeEnd ? '移动包络' : '伸缩包络',
        target: [...selectedEnvelopeList],
        difX,
        difRow,
        changeStart,
        changeEnd,
      })
    }
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}

export default moveItem

interface Data {
  start: number
  end: number
  row: number
  offsetX: number
}
