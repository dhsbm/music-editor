/**
 * @description: 将基础数据转为JSON格式字符串
 * @param {string | undefined | number} value 传入的数据
 * @return {string} 返回JSON字符串
 */
const stringify = (value: string | undefined | number): string => {
  const type = typeof value
  if (/string|undefined/.test(type)) {
    value = '"' + value + '"'
  }
  return String(value)
}

export default stringify
