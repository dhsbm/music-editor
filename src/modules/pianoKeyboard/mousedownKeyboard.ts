import { keyboardStaticData, keyboardData, keyboardRender } from '.'

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
    const i = Math.floor(x / cellWidth)
    const rest = x % cellWidth
    let res = keyColorOrder[i % 12] + i

    if (res[0] == 'b' && y > blackKeyHeight) {
      if (rest < cellWidth / 2) res = 'w' + (i - 1)
      else res = 'w' + (i + 1)
    }
    if (res != keyboardStaticData.mouseDownKey) {
      keyboardStaticData.mouseDownKey = res
      // console.log('播放对应的音乐', res)
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
