/**
 * @description: 获取数字小数点后的位数
 * @param {number} num 要检测的数字
 * @return {number} 返回数字小数点后的位数
 */
const getPlaces = (num: number): number => {
  const stringLength = String(num % 1).length
  return stringLength == 1 ? 0 : stringLength - 2
}

export default getPlaces
