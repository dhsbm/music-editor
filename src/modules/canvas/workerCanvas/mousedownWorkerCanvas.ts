import { toRaw } from 'vue'
import { workerCanvasData, workerCanvasRender } from '..'
import { workerSig } from 'modules/time'
import { adsorb, getSelectBox, initSelectBox, throttle } from 'modules/tools'
import { trackData } from 'modules/track'
import { mode, globalData } from 'modules/globalData'
import { findPointPattern, deletePattern, addPattern, selectPattern, mousedownPattern } from 'modules/pattern'
import { selectEnvelope, findPointEnvelope, deleteEnvelope, addEnvelope, mousedownEnvelope } from 'modules/envelope'
import { selectDot } from 'modules/dot'
import { Pattern, Envelope, Project, Track } from '@/class'
import { Mode } from 'modules/globalData/Interface'

/**
 * @description: 工作区鼠标点下，添加/拖动/伸缩/多选乐谱，右键进入删除模式
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const mousedownWorkerCanvas = (e: MouseEvent) => {
  // 鼠标中键
  if (e.button == 1) {
    // moveCanvas(e, workerCanvasData)
    const str = Project.stringify(globalData.project, true)
    console.log(str)
    // console.log(str)
    // const object = JSON.parse(str)
    // console.log(object)
    // const project = Project.parse(object)
    // console.log(project)
    return
  }

  // 点击处有乐谱，调用乐谱处理函数
  const patternData = findPointPattern(e)
  if (patternData.pointPattern) {
    mousedownPattern(e, patternData)
    return
  }
  const envelopeData = findPointEnvelope(e)
  // 这里有一点小瑕疵
  if (envelopeData.pointEnvelope) {
    mousedownEnvelope(e, envelopeData)
    return
  }

  // 鼠标右键
  if (e.button == 2) {
    // 进入快捷删除模式
    const canvas = <HTMLCanvasElement>workerCanvasData.canvas
    globalData.pressed = true
    const move = throttle((event: MouseEvent) => {
      const { pointPattern } = findPointPattern(event)
      pointPattern && deletePattern(pointPattern)

      const { pointEnvelope } = findPointEnvelope(event)
      pointEnvelope && deleteEnvelope(pointEnvelope)
    }, 15)
    const moveEnd = () => {
      globalData.pressed = false
      canvas.removeEventListener('mousemove', move)
      canvas.removeEventListener('mouseup', moveEnd)
      canvas.removeEventListener('mouseleave', moveEnd)
    }
    canvas.addEventListener('mousemove', move)
    canvas.addEventListener('mouseup', moveEnd)
    canvas.addEventListener('mouseleave', moveEnd)

    return
  }

  // 鼠标左键
  const { beatWidth, beatHeight, coverPixelY, leftBeat } = workerCanvasData
  const { trackOrder, trackCount } = trackData
  const trackMap = toRaw(trackData.trackMap)
  const { selectBoxStyle } = workerCanvasData
  const sig = Math.floor((4 * 10 ** 6) / workerSig.value) / 10 ** 6

  // 清空选择区
  selectPattern()
  selectEnvelope()
  selectDot()
  if (mode.value == Mode.Add) {
    // 添加模式：添加乐谱/包络
    const item = e.shiftKey ? addEnvelope(e) : addPattern(e)
    const oldPageX = e.pageX
    const oldEnd = item.end // 原始末端
    globalData.pressed = true
    const move = throttle((event: MouseEvent) => {
      const difX = adsorb((event.pageX - oldPageX) / beatWidth, sig, sig / 2)
      if (oldEnd + difX > item.start) item.end = oldEnd + difX
      workerCanvasRender()
    }, 15)
    const moveEnd = () => {
      globalData.pressed = false
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', moveEnd)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', moveEnd)
  } else if (mode.value == Mode.Select) {
    // 选择模式：显示多选框多选音节
    initSelectBox(e, selectBoxStyle)
    globalData.pressed = true
    const move = throttle((event: MouseEvent) => {
      const { top, left, width, height } = getSelectBox(event, selectBoxStyle)

      const minRow = ((top + coverPixelY) / beatHeight) | 0,
        maxRow = Math.min(trackCount - 1, ((top + height + coverPixelY) / beatHeight) | 0),
        minBeat = left / beatWidth + leftBeat,
        maxBeat = (left + width) / beatWidth + leftBeat

      selectPattern()
      selectEnvelope()
      for (let i = minRow; i <= maxRow; i++) {
        const track = <Track>trackMap.get(trackOrder[i])
        for (const patternId of track.patternIdSet || []) {
          const pattern = Pattern.getPattern(patternId)
          if (pattern.end >= minBeat && pattern.start <= maxBeat) selectPattern(pattern, false)
        }

        for (const envelopeId of track.envelopeIdSet || []) {
          const envelope = Envelope.getEnvelope(envelopeId)
          if (envelope.end >= minBeat && envelope.start <= maxBeat) selectEnvelope(envelope, false)
        }
      }
    }, 15)
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

export default mousedownWorkerCanvas
