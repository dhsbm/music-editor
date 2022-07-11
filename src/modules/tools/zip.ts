import pako from 'pako'

/**
 * @description: 压缩字符串
 * @param {string} str 字符串
 * @return {string}
 */
const zip = (str: string) => {
  const arr = Array.from(pako.deflate(str))
  const s = arr.reduce((a, b) => a + String.fromCharCode(b), '')
  return btoa(s)
}

export default zip
