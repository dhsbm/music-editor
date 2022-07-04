import { bpm } from 'modules/time'

/**
 * @description: 将时间转换为beat (秒)
 * @param {number} time
 * @return {number}
 */
const timeToBeat = (time: number) => {
  return (time * bpm.value) / 60
}

export default timeToBeat
