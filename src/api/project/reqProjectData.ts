import { mockAjax, ResponseInterface } from '..'

interface ProjectDataResponse extends ResponseInterface {
  data: {
    bpm: number // 项目bpm
    projectData: string // 项目数据
  }
}

/**
 * @description: 获取项目数据API
 * @param {number} projectId 要获取的项目id 如果为0，则是随机音乐灵感
 * @return {Promise<ProjectDataResponse>} bpm与项目数据(长字符串)
 */
const reqProjectData = (projectId: number): Promise<ProjectDataResponse> => mockAjax.get(`/projectData/${projectId}`)

export default reqProjectData
