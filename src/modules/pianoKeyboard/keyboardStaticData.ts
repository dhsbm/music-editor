// 键盘静态数据
const keyboardStaticData = {
  cellWidth: 22,
  whiteKeyHeight: 150,
  blackKeyHeight: 95,
  defaultWhiteColor: '#dcdcdc',
  defaultBlackColor: '#222222',
  activeWhiteColor: '#4C4B4B', // 按下时的颜色
  activeBlackColor: '#686766',
  mapNumberList: '2356790',
  mapLetterList: 'QWERTYUIOP',
  downNumberList: <Set<string>>new Set(),
  downLetterList: <Set<string>>new Set(),
  mapNumberLocationList: [1.5, 3.5, 6.5, 8.5, 10.5, 13.5, 15.5], // 数字位置
  mapLetterLocationList: [0.75, 2.5, 4.25, 5.75, 7.5, 9.5, 11.25, 12.75, 14.5, 16.25], // 字母位置
  lineLocationList: [0, 1.5, 3.5, 5, 6.5, 8.5, 10.5, 12, 13.5, 15.5, 17], // 画线位置
  blackKeyLocationList: [1, 3, 6, 8, 10, 13, 15], // 黑键位置
  canvas: <HTMLCanvasElement>(<unknown>undefined),
  ctx: <CanvasRenderingContext2D>(<unknown>undefined),
  keyColorOrder: 'wbwbwwbwbwbw',
  mouseDownKey: '',
}

export default keyboardStaticData
