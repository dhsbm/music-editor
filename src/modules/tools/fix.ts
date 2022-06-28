/**
 * @description: 把num约成n位小数
 * @param {number} num 要截取的数
 * @param {number} [n] 保留的位数 默认为6位
 * @return {number} 截取后的数
 */
const fix = (num: number, n = 6): number => Math.round(num * 10 ** n) / 10 ** n

export default fix
