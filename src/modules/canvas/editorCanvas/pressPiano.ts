import { drawPiano, editorCanvasData, editorPianoCanvasData } from '..'
import { playDefaultNote } from 'modules/audio'
import { contentEditorData } from 'modules/pattern'
const keyColorOrder = 'wbwbwbwwbwbw'

/**
 * @description: 按下钢琴
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const pressPiano = (e: MouseEvent) => {
  if (e.button != 0) return
  const { beatHeight } = editorCanvasData
  const canvas = editorPianoCanvasData.canvas
  const move = (event: MouseEvent) => {
    const x = event.offsetX,
      y = event.offsetY
    const index = Math.floor(y / beatHeight)
    const rest = y % beatHeight
    let res = keyColorOrder[index % 12] + index
    if (res[0] == 'b' && x > 38) {
      if (rest < beatHeight / 2) res = 'w' + (index - 1)
      else res = 'w' + (index + 1)
    }

    if (res != editorPianoCanvasData.pressedKey) {
      editorPianoCanvasData.pressedKey = res
      // 自动播放对应的音乐
      playDefaultNote(index, contentEditorData.pattern!.track.source)
      drawPiano()
    }
  }
  move(e)
  const moveEnd = () => {
    editorPianoCanvasData.pressedKey = ''
    drawPiano()
    canvas.removeEventListener('mousemove', move)
    canvas.removeEventListener('mouseup', moveEnd)
    canvas.removeEventListener('mouseleave', moveEnd)
  }
  canvas.addEventListener('mousemove', move)
  canvas.addEventListener('mouseup', moveEnd)
  canvas.addEventListener('mouseleave', moveEnd)
}

export default pressPiano
