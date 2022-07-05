import { keyboardStaticData, keydownRender } from '.'

/**
 * @description: 键盘按下时，暂停音乐，恢复按下的键
 * @param {KeyboardEvent} e 键盘事件
 * @return {void}
 */
const keyup = (e: KeyboardEvent) => {
  const key = e.key.toUpperCase()
  const { mapLetterList, mapNumberList, downLetterList, downNumberList } = keyboardStaticData
  if (mapLetterList.indexOf(key) !== -1) {
    downLetterList.delete(key)
    keydownRender()
  } else if (mapNumberList.indexOf(key) !== -1) {
    downNumberList.delete(key)
    keydownRender()
  }
}

export default keyup
