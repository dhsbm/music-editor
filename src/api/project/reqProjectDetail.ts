import { mockAjax, ResponseInterface } from '..'

interface ProjectDetailResponse extends ResponseInterface {
  data: {
    title: string // 项目标题
    bpm: number // 项目bpm
    authorId: string // 作者id
    trackAmount: number // 项目音轨数
    barAmount: number // 项目小节数
    createTime: number // 项目创建时间
    updateTime: number // 项目更新时间
    introduce: string // 项目介绍
  }
}

/**
 * @description: 获取项目详情API
 * @param {number} projectId 要获取的项目id
 * @return {Promise<ProjectDetailResponse>} 返回项目详情数据
 */
const reqProjectDetail = (projectId: number): Promise<ProjectDetailResponse> =>
  mockAjax.get(`/projectDetail/${projectId}`)

export default reqProjectDetail
