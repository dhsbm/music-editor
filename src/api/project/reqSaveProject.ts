import { mockAjax, ResponseInterface } from '..'

interface ProjectDetailParams {
  title: string // 项目标题
  bpm: number // 项目bpm
  trackAmount: number // 项目音轨数
  barAmount: number // 项目小节数
  projectData: string // 项目字符串化数据
}

interface SaveProjectResponse extends ResponseInterface {
  data: null
}

/**
 * @description: 保存项目API
 * @param {number} projectId 要保存的项目id
 * @param {string} projectDetail 项目新数据
 * @return {Promise<SaveProjectResponse>} 返回数据无内容
 */

const reqSaveProject = (projectId: number, projectDetail: ProjectDetailParams): Promise<SaveProjectResponse> =>
  mockAjax.put(`/saveProject/${projectId}`, projectDetail)

export default reqSaveProject
