import { mockAjax, ResponseInterface } from '..'

interface ProjectDetailParams {
  title: string // 项目标题
  bpm: number // 项目bpm
  trackAmount: number // 项目音轨数
  barAmount: number // 项目小节数
  introduce: string // 项目介绍
  projectData: string // 项目字符串化数据
}

interface SaveAsProjectResponse extends ResponseInterface {
  data: {
    projectId: number // 新项目id
  }
}

/**
 * @description: 另存为项目API
 * @param {number} projectId 要另存的项目id
 * @param {string} projectDetail 项目内容
 * @return {Promise<SaveAsProjectResponse>} 返回新项目id
 */

const reqSaveAsProject = (projectDetail: ProjectDetailParams): Promise<SaveAsProjectResponse> =>
  mockAjax.put('/saveAsProject', projectDetail)

export default reqSaveAsProject
