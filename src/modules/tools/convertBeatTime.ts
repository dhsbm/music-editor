import { bpm } from 'modules/time'
import { ConvertDir } from './Interfacs'

/**
 * @description: 节拍与秒互转
 * @param {ConvertDir} convertDir 转换方向
 * @param {number} num 要转换的数字
 * @return {number}
 */
const convertBeatTime = (convertDir: ConvertDir, num: number) => {
  if (convertDir === ConvertDir.BeatToTime) {
    return (num * 60) / bpm.value
  } else {
    return (num * bpm.value) / 60
  }
}

export default convertBeatTime
