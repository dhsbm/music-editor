import { keyboardStaticData, keyboardData, drawKeyboardRenderText } from '.'

/**
 * @description: 绘制按下的键
 * @return {void}
 */
const keydownRender = () => {
  const {
    ctx,
    mapLetterList,
    mapNumberList,
    lineLocationList,
    blackKeyLocationList,
    cellWidth,
    whiteKeyHeight,
    blackKeyHeight,
  } = keyboardStaticData
  const startX = keyboardData.octave * 12 * cellWidth
  ctx.fillStyle = keyboardStaticData.defaultWhiteColor
  ctx.fillRect(startX, 0, cellWidth * 17, whiteKeyHeight)
  ctx.fillStyle = keyboardStaticData.activeWhiteColor

  for (const key of keyboardStaticData.downLetterList) {
    const i = mapLetterList.indexOf(key.toUpperCase())
    const x = startX + cellWidth * lineLocationList[i]
    const w = cellWidth * (lineLocationList[i + 1] - lineLocationList[i])
    ctx.fillRect(x, 0, w, whiteKeyHeight)
  }
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  for (let i = 1; i < 10; i++) {
    ctx.moveTo(cellWidth * lineLocationList[i] + startX, 0)
    ctx.lineTo(cellWidth * lineLocationList[i] + startX, whiteKeyHeight)
  }
  ctx.stroke()
  ctx.closePath()
  ctx.fillStyle = keyboardStaticData.defaultBlackColor
  for (let j = 0; j < 7; j++) {
    ctx.fillRect(cellWidth * blackKeyLocationList[j] + startX, 0, cellWidth, blackKeyHeight)
  }
  ctx.fillStyle = keyboardStaticData.activeBlackColor
  for (const num of keyboardStaticData.downNumberList) {
    const i = mapNumberList.indexOf(num)
    const x = startX + cellWidth * blackKeyLocationList[i]
    ctx.fillRect(x, 0, cellWidth, blackKeyHeight)
  }
  drawKeyboardRenderText()
}

export default keydownRender
