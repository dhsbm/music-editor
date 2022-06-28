import projectList from './projectList'

/**
 * @description: 根据路径获取项目id
 * @param {string} url 请求路径
 * @return {number} 项目id
 */
const gerProjectIdFromUrl = (url: string): number => {
  const arr = url.split('/')
  let projectId = parseInt(arr[arr.length - 1])
  if (projectId == 0) {
    // 参数为0，返回随机项目
    const randomIndex = (Math.random() * (projectList.length - 1)) | 0
    projectId = projectList[randomIndex].projectId
  }

  return projectId
}

export default gerProjectIdFromUrl
