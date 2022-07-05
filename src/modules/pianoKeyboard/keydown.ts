import { playDefaultNote } from 'modules/audio'
import { keyboardData, keyboardStaticData, keydownRender } from '.'

/**
 * @description: 键盘按下时，播放音乐，绘制按下的键
 * @param {KeyboardEvent} e 键盘事件
 * @return {void}
 */
const keydown = (e: KeyboardEvent) => {
  if (!keyboardData.show) return
  const key = e.key.toUpperCase()
  const { mapLetterList, mapNumberList, downLetterList, downNumberList, mapLetterLocationList, mapNumberLocationList } =
    keyboardStaticData
  if (downLetterList.has(key) || downNumberList.has(key)) return
  let index = keyboardData.octave * 12
  const letterIndex = mapLetterList.indexOf(key)
  const numberIndex = mapNumberList.indexOf(key)
  if (letterIndex != -1) {
    index += mapLetterLocationList[letterIndex] | 0
    downLetterList.add(key)
    keydownRender()
    if (index <= 119) playDefaultNote(119 - index)
  } else if (numberIndex != -1) {
    index += mapNumberLocationList[letterIndex] | 0
    downNumberList.add(key)
    keydownRender()
    if (index <= 119) playDefaultNote(119 - index)
  }
}

export default keydown
