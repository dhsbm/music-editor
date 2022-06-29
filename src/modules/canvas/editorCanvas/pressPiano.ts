import { drawPiano, editorCanvasData, editorPianoCanvasData } from '..'

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
    const i = Math.floor(y / beatHeight)
    const r = y % beatHeight
    let res = keyColorOrder[i % 12] + i
    if (res[0] == 'b' && x > 38) {
      if (r < beatHeight / 2) res = 'w' + (i - 1)
      else res = 'w' + (i + 1)
    }
    if (res != editorPianoCanvasData.pressedKey) {
      editorPianoCanvasData.pressedKey = res
      // console.log('播放对应的音乐', res)
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
