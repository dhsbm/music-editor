import { keyboardData, keyboardRender } from '.'

/**
 * @description: 改变八度
 * @param {number} num 改变的数字
 * @return {void}
 */
const changeOctave = (num: number) => {
  keyboardData.octave += num
  if (keyboardData.octave < 0) {
    keyboardData.octave = 0
    return
  }
  if (keyboardData.octave > 9) {
    keyboardData.octave = 9
    return
  }
  keyboardRender()
}

export default changeOctave
