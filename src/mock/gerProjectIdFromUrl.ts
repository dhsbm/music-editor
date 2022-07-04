/**
 * @description: 根据路径获取项目id
 * @param {string} url 请求路径
 * @return {number} 项目id
 */
const gerProjectIdFromUrl = (url: string): number => {
  const arr = url.split('/')
  const projectId = parseInt(arr[arr.length - 1])
  return projectId
}

export default gerProjectIdFromUrl
