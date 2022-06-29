import { keyboardStaticData, keyboardData } from '.'

/**
 * @description: 写八度
 * @return {void}
 */
const drawKeyboardRenderText = () => {
  const { ctx, mapLetterList, mapLetterLocationList, mapNumberList, mapNumberLocationList, cellWidth } =
    keyboardStaticData
  const startX = keyboardData.octave * 12 * cellWidth
  ctx.font = 'bold 14px sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = '#808080'
  for (let i = 0; i < 10; i++) {
    ctx.fillText(mapLetterList[i], cellWidth * mapLetterLocationList[i] + startX, 120)
  }
  for (let i = 0; i < 7; i++) {
    ctx.fillText(mapNumberList[i], cellWidth * mapNumberLocationList[i] + startX, 60)
  }
}

export default drawKeyboardRenderText
