// const noteArr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].reverse()
// B5 A#5 A5 G#4 G4 F#4 F4 E4 D#4 D4 C#4 C
const frequencyArr = [
  493.883, 466.164, 440.0, 415.305, 391.995, 369.994, 349.228, 329.628, 311.127, 293.665, 277.173, 261.626,
]

/**
 * @description: 根据索引返回频率
 * @param {number} index 索引 0-119
 * @return {number}
 */
const indexToFrequency = (index: number) => {
  const section = (index / 12) | 0 // 0-9
  const i = index % 12
  return frequencyArr[i] * 2 ** (5 - section)
}

export default indexToFrequency
