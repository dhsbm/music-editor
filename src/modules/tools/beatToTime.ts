import { bpm } from 'modules/time'

/**
 * @description: 将节拍数转换为时间 (秒)
 * @param {number} time
 * @return {number}
 */
const beatToTime = (beat: number) => {
  return (beat * 60) / bpm.value
}

export default beatToTime
