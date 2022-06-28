/**
 * @description: 吸附函数，如果数字在可调整范围内，则调整为最接近的数
 * @param {number} num 要调整是数
 * @param {number} [base] 基数
 * @param {number} [range] 调整范围
 * @return {number} 调整后的数
 */
const adsorb = (num: number, base = 1, range = 0.1): number => {
  let sign = 1
  if (num < 0) {
    num = -num
    sign = -1
  }
  const pow = 10 ** 8
  num *= pow
  base *= pow
  range *= pow
  const rest = num % base

  if (rest <= range) {
    num -= rest
  } else if (base - rest <= range) {
    num = num - rest + base
  }

  return (num / pow) * sign
}

export default adsorb
