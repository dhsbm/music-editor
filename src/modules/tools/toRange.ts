/**
 * @description: 将数字控制在范围内
 * @param {number} num 要处理的数
 * @param {number} max 最大值
 * @param {number} [min] 最小值
 * @return {number} 在范围内的数
 */
const toRange = (num: number, max: number, min = 0): number => Math.max(min, Math.min(num, max))

export default toRange
