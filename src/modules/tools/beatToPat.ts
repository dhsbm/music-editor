/**
 * @description: 将小节转换为节拍
 * @param {number} beat 小节数
 * @param {number} sig 分节 最大为16
 * @return {string}
 */
const beatToPat = (beat: number, sig: number): string => {
  beat /= 4
  let a = Math.floor(beat)
  beat -= a
  let b = Math.floor(beat * sig)
  const c = (beat * sig).toFixed(3).split('.')[1]

  return ++a + '.' + ++b + '.' + c
}

export default beatToPat
