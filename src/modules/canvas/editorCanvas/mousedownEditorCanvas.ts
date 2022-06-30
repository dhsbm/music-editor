import { contentEditorData } from 'modules/pattern'
import { selectNote, addNote, deleteNote, findPointNote, mousedownNote } from 'modules/note'
import { editorSig } from 'modules/time'
import { adsorb, getSelectBox, initSelectBox, throttle } from 'modules/tools'
import { editorCanvasData, editorCanvasRender } from '..'
import { globalData, mode } from 'modules/globalData'
import { toRaw } from 'vue'
import { Pattern } from '@/class'
import { Mode } from 'modules/globalData/Interface'

/**
 * @description: 工作区鼠标点下，添加/拖动/伸缩/多选音节，右键进入删除模式
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const mousedownEditorCanvas = (e: MouseEvent) => {
  // 鼠标中键
  if (e.button == 1) {
    return
  }

  // 如果点击的是音节，调用音节函数
  const data = findPointNote(e)
  if (data.pointNote) {
    mousedownNote(e, data)
    return
  }

  // 鼠标右键
  if (e.button == 2) {
    // 进入快捷删除模式
    const canvas = <HTMLCanvasElement>editorCanvasData.canvas
    globalData.pressed = true
    const move = throttle((event: MouseEvent) => {
      const { pointNote } = findPointNote(event)
      if (pointNote) {
        deleteNote(pointNote)
      }
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
  const { beatWidth, beatHeight, coverPixelY, leftBeat, selectBoxStyle } = editorCanvasData
  const pattern = <Pattern>toRaw(contentEditorData.pattern)
  const sig = Math.floor((4 * 10 ** 6) / editorSig.value) / 10 ** 6
  selectNote()
  if (mode.value == Mode.Add) {
    // 添加模式：添加音节
    const note = addNote(e)
    const oldPageX = e.pageX
    const oldEnd = note.end // 原始末端
    globalData.pressed = true
    const move = throttle((event: MouseEvent) => {
      const difX = adsorb((event.pageX - oldPageX) / beatWidth, sig, sig / 2)
      if (oldEnd + difX > note.start) note.end = oldEnd + difX
      editorCanvasRender()
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
        maxRow = Math.min(131, ((top + height + coverPixelY) / beatHeight) | 0),
        minBeat = left / beatWidth + leftBeat - pattern.offsetX,
        maxBeat = (left + width) / beatWidth + leftBeat - pattern.offsetX

      selectNote()
      for (let i = minRow; i <= maxRow; i++)
        for (const note of pattern.getNotes(i))
          if (note.end >= minBeat && note.start <= maxBeat) selectNote(note, false)
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

export default mousedownEditorCanvas
