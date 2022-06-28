/**
 * @description: 将小节转换为时间
 * @param {number} beat 小节数
 * @param {number} bpm bpm
 * @return {string}
 */
const beatToTime = (beat: number, bpm: number): string => {
  beat = (beat * 60) / bpm
  const hour = (beat / 3600) | 0
  beat %= 3600
  const minute = (beat / 60) | 0
  beat %= 60
  const second = beat - (beat % 1)
  const rest = ((beat % 1) * 100) | 0

  // 字符串前置补零
  const pad = (num: number): string => String(num).padStart(2, '0')

  return hour + ':' + pad(minute) + ':' + pad(second) + '.' + pad(rest)
}

export default beatToTime
