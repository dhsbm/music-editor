import { convertBeatTime } from '.'
import { ConvertDir } from './Interfacs'

/**
 * @description: 将小节转换为时间
 * @param {number} beat 小节数
 * @return {string}
 */
const beatToTime = (beat: number): string => {
  let time = convertBeatTime(ConvertDir.BeatToTime, beat)
  const hour = (time / 3600) | 0
  time %= 3600
  const minute = (time / 60) | 0
  time %= 60
  const second = time - (time % 1)
  const rest = ((time % 1) * 100) | 0

  // 字符串前置补零
  const pad = (num: number): string => String(num).padStart(2, '0')

  return hour + ':' + pad(minute) + ':' + pad(second) + '.' + pad(rest)
}

export default beatToTime
