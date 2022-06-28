/**
 * @description: 将数字缩小为基数的最大整倍数
 * @param {number} num 要缩小的数
 * @param {number} base 基数
 * @return {number} 不大于num的base最大整倍数
 */
const toMultiple = (num: number, base: number): number => ((num / base) | 0) * base

export default toMultiple
