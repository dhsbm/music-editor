import { editorPianoCanvasData } from 'modules/canvas'

const defaultWhiteColor = '#dcdcdc',
  defaultBlackColor = '#222222',
  activeWhiteColor = '#4C4B4B', // 按下时的颜色
  activeBlackColor = '#686766',
  lineLocationList = [0, 1.5, 3.5, 5.5, 7, 8.5, 10.5], // 画线位置
  blackKeyLocationList = [1, 3, 5, 8, 10], // 黑键位置
  beatWidth = 60,
  beatHeight = 16 // 按键高度

/**
 * @description: 绘制钢琴键盘
 * @return {void}
 */
const drawPiano = () => {
  const pressedKey = editorPianoCanvasData.pressedKey
  const ctx = editorPianoCanvasData.ctx
  ctx.fillStyle = defaultWhiteColor
  ctx.fillRect(0, 0, beatWidth, beatHeight * 132)
  if (pressedKey[0] == 'w') {
    const index = parseInt(pressedKey.slice(1))
    ctx.fillStyle = activeWhiteColor
    const rest = index % 12
    if (rest == 0 || rest == 7) ctx.fillRect(0, beatHeight * index, beatWidth, beatHeight * 1.5)
    else if (rest == 6 || rest == 11) ctx.fillRect(0, beatHeight * (index - 0.5), beatWidth, beatHeight * 1.5)
    else ctx.fillRect(0, beatHeight * (index - 0.5), beatWidth, beatHeight * 2)
  }
  // 画线 / 区分白键
  ctx.lineWidth = 1
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  for (let i = 0; i < 11; i++) {
    const offsetY = 12 * beatHeight * i
    for (let j = 0; j < 7; j++) {
      ctx.moveTo(0, beatHeight * lineLocationList[j] + offsetY)
      ctx.lineTo(beatWidth, beatHeight * lineLocationList[j] + offsetY)
    }
  }
  ctx.stroke()
  ctx.closePath()
  // 画黑键
  ctx.fillStyle = defaultBlackColor
  ctx.fillRect(0, beatHeight, 38, beatHeight)
  for (let i = 0; i < 11; i++) {
    const offsetY = 12 * beatHeight * i
    for (let j = 0; j < 5; j++) {
      ctx.fillRect(0, beatHeight * blackKeyLocationList[j] + offsetY, 38, beatHeight)
    }
  }
  if (pressedKey[0] == 'b') {
    const index = parseInt(pressedKey.slice(1))
    ctx.fillStyle = activeBlackColor
    ctx.fillRect(0, beatHeight * index, 38, beatHeight)
  }

  ctx.font = '12px sans-serif'
  ctx.textAlign = 'right'
  ctx.fillStyle = 'black'
  for (let i = 0; i < 11; i++) {
    const offsetY = 12 * beatHeight * (i + 1)
    ctx.fillText('C' + (10 - i), 55, offsetY - 5)
  }
}

export default drawPiano
