import { keydown, keyup, keyboardRender, keyboardStaticData } from '.'

/**
 * @description: 初始化键盘
 * @return {void}
 */
const initKeyboard = () => {
  document.addEventListener('keydown', keydown)
  document.addEventListener('keyup', keyup)
  const canvas = keyboardStaticData.canvas
  canvas.width = 22 * 120
  canvas.height = keyboardStaticData.whiteKeyHeight
  keyboardStaticData.ctx = <CanvasRenderingContext2D>canvas.getContext('2d')
  keyboardRender()
}

export default initKeyboard
