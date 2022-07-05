import { keyboardStaticData, drawKeyboardRenderText } from '.'

/**
 * @description: 绘制全部键盘
 * @return {void}
 */
const keyboardRender = () => {
  const { ctx, lineLocationList, blackKeyLocationList, whiteKeyHeight, blackKeyHeight, cellWidth, mouseDownKey } =
    keyboardStaticData

  ctx.fillStyle = keyboardStaticData.defaultWhiteColor // 画白键
  ctx.fillRect(0, 0, cellWidth * 120, whiteKeyHeight)
  if (mouseDownKey[0] == 'w') {
    const i = parseInt(mouseDownKey.slice(1))
    ctx.fillStyle = keyboardStaticData.activeWhiteColor
    const rest = i % 12
    if (rest == 0 || rest == 5) ctx.fillRect(cellWidth * i, 0, cellWidth * 1.5, whiteKeyHeight)
    else if (rest == 4 || rest == 11) ctx.fillRect(cellWidth * (i - 0.5), 0, cellWidth * 1.5, whiteKeyHeight)
    else ctx.fillRect(cellWidth * (i - 0.5), 0, cellWidth * 2, whiteKeyHeight)
  }
  // 画线 / 白键
  ctx.lineWidth = 0.5
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  for (let i = 0; i < 10; i++) {
    const s = 12 * cellWidth * i
    for (let j = 0; j < 7; j++) {
      ctx.moveTo(cellWidth * lineLocationList[j] + s, 0)
      ctx.lineTo(cellWidth * lineLocationList[j] + s, whiteKeyHeight)
    }
  }
  ctx.stroke()
  ctx.closePath()
  // 画黑键
  ctx.fillStyle = keyboardStaticData.defaultBlackColor
  for (let i = 0; i < 10; i++) {
    const s = 12 * cellWidth * i
    for (let j = 0; j < 5; j++) {
      ctx.fillRect(cellWidth * blackKeyLocationList[j] + s, 0, cellWidth, blackKeyHeight)
    }
  }
  if (mouseDownKey[0] == 'b') {
    const i = parseInt(mouseDownKey.slice(1))
    ctx.fillStyle = keyboardStaticData.activeBlackColor
    ctx.fillRect(cellWidth * i, 0, cellWidth, blackKeyHeight)
  }
  drawKeyboardRenderText()
}

export default keyboardRender
