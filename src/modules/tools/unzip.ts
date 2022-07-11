import pako from 'pako'

/**
 * @description: 解压字符串
 * @param {string} str 字符串
 * @return {string}
 */
const unzip = (str: string) => {
  const charData = atob(str)
    .split('')
    .map((x) => x.charCodeAt(0))
  const binData = new Uint8Array(charData)
  const restored = pako.inflate(binData, { to: 'string' })
  return restored
}

export default unzip
