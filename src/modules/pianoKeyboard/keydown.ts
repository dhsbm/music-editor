import { keyboardStaticData, keydownRender } from '.'

/**
 * @description: 键盘按下时，播放音乐，绘制按下的键
 * @param {KeyboardEvent} e 键盘事件
 * @return {null}
 */
const keydown = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase()
  const { mapLetterList, mapNumberList, downLetterList, downNumberList } = keyboardStaticData
  if (downLetterList.has(key) || downNumberList.has(key)) return
  if (mapLetterList.indexOf(key) != -1) {
    // console.log('播放对应的音乐', key)
    downLetterList.add(key)
    keydownRender()
  } else if (mapNumberList.indexOf(key) != -1) {
    // console.log('播放对应的音乐', key)
    downNumberList.add(key)
    keydownRender()
  }
}

export default keydown
