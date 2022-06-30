import { contentEditorData } from 'modules/pattern'
import { recordHistory } from 'modules/history'
import { selectNote, deleteNote, selectedNoteList, showNoteMenu, tailorNote, findPointNote } from '.'
import { editorSig } from 'modules/time'
import { adsorb, throttle, toMultiple, toRange } from 'modules/tools'
import { editorCanvasData, editorCanvasRender } from 'modules/canvas'
import { globalData, mode } from 'modules/globalData'
import { toRaw } from 'vue'
import { Note, Pattern } from '@/class'
import { Mode } from 'modules/globalData/Interface'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 点击音谱的处理函数
 * @param {MouseEvent} e 鼠标事件对象
 * @param {Object} data 包含点中音节数据的对象
 * @return {*}
 */
const mousedownNote = (e: MouseEvent, data: ReturnType<typeof findPointNote>) => {
  const { changeStart, changeEnd } = data
  const note = <Note>data.pointNote
  selectNote(note, !selectedNoteList.has(note))

  if (e.button == 2) {
    showNoteMenu(e)
    return
  }
  // 鼠标左键
  const { beatWidth, beatHeight, coverPixelY, leftBeat, difHeight } = editorCanvasData
  const pattern = <Pattern>toRaw(contentEditorData.pattern)
  const sig = Math.floor((4 * 10 ** 6) / editorSig.value) / 10 ** 6

  if (mode.value == Mode.Delete) {
    // 删除模式：删除目标音节
    deleteNote(note)
  } else if (mode.value == Mode.Tailor) {
    // 裁剪模式：创造新音节，浅拷贝其中的内容
    const middle = adsorb(e.offsetX / beatWidth + pattern.offsetX + leftBeat, sig, sig / 2)
    // 不满足裁剪条件，返回
    if (middle >= note.end || middle <= note.start) return
    tailorNote(note, middle)
  } else {
    // 选择/添加模式：拖动或修改音节
    const oldPageX = e.pageX,
      oldPageY = e.pageY,
      oldData = <{ start: number; end: number; row: number }[]>[] // 修改前的数据
    let difX = 0, // 水平方向上像素差
      difRow = 0, // 垂直方向上行数差
      preRow = 0, // 之前的行数差
      minRow = 131, // 最小的行数
      maxRow = 0, // 最大行数
      minWidth = 10000 // 最小宽度
    // 循环选择区，记录原始值
    for (const note of selectedNoteList) {
      oldData.push({
        start: note.start,
        end: note.end,
        row: note.row,
      })
      minRow = Math.min(minRow, note.row)
      maxRow = Math.max(maxRow, note.row)
      minWidth = Math.min(minWidth, note.width)
    }
    editorCanvasData.mobile = true
    globalData.pressed = true
    // 定义移动函数
    const move = throttle((event: MouseEvent) => {
      difX = adsorb((event.pageX - oldPageX) / beatWidth + editorCanvasData.leftBeat - leftBeat, sig, sig / 2)
      if (changeStart && changeEnd) {
        const newRow = (event.pageY - oldPageY + editorCanvasData.coverRadioY * difHeight - coverPixelY) / beatHeight
        difRow = toRange(Math.round(newRow), 131 - maxRow, -minRow)
      }
      if (changeEnd && !changeStart) {
        if (difX <= -minWidth)
          difX = minWidth % sig == 0 ? -toMultiple(minWidth - sig, sig) : -toMultiple(minWidth, sig)
      }
      let i = 0
      for (const note of selectedNoteList) {
        if (changeStart) note.start = oldData[i].start + difX
        if (changeEnd) note.end = oldData[i].end + difX
        if (difRow != preRow) {
          note.deleteSelf()
          note.row = oldData[i].row + difRow
          note.addSelf()
        }
        i++
      }
      preRow = difRow
      editorCanvasRender()
    }, 15)
    // 移动结束时
    const moveEnd = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', moveEnd)
      editorCanvasData.mobile = false
      globalData.pressed = false
      // 做记录
      if (difX != 0 || difRow != 0) {
        recordHistory({
          type: HistoryType.Note,
          describe: changeStart && changeEnd ? '移动音节' : '伸缩音节',
          target: [...selectedNoteList],
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
}

export default mousedownNote
