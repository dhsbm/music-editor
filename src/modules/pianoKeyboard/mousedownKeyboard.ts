import { keyboardStaticData, keyboardData, keyboardRender } from '.'
import { playDefaultNote } from 'modules/audio'

/**
 * @description: 鼠标点击键盘时
 * @param {MouseEvent} e
 * @return {void}
 */
const mousedownKeyboard = (e: MouseEvent) => {
  if (e.button != 0) return // 检测是否为左键按下
  const { cellWidth, blackKeyHeight, whiteKeyHeight, keyColorOrder, canvas } = keyboardStaticData
  const { zoom } = keyboardData
  const ratioY = canvas.clientHeight / whiteKeyHeight

  const move = (event: MouseEvent) => {
    const x = event.offsetX / zoom,
      y = event.offsetY / ratioY
    const index = Math.floor(x / cellWidth)
    const rest = x % cellWidth
    let res = keyColorOrder[index % 12] + index

    if (res[0] == 'b' && y > blackKeyHeight) {
      if (rest < cellWidth / 2) res = 'w' + (index - 1)
      else res = 'w' + (index + 1)
    }
    if (res != keyboardStaticData.mouseDownKey) {
      keyboardStaticData.mouseDownKey = res
      playDefaultNote(119 - index)
      keyboardRender()
    }
  }
  move(e)
  const moveEnd = () => {
    keyboardStaticData.mouseDownKey = ''
    keyboardRender()
    canvas.removeEventListener('mousemove', move)
    canvas.removeEventListener('mouseup', moveEnd)
    canvas.removeEventListener('mouseleave', moveEnd)
  }
  canvas.addEventListener('mousemove', move)
  canvas.addEventListener('mouseup', moveEnd)
  canvas.addEventListener('mouseleave', moveEnd)
}

export default mousedownKeyboard
