import { mockAjax, ResponseInterface } from '..'

interface ProjectListResponse extends ResponseInterface {
  data: {
    projectId: number // 项目id
    title: string // 项目标题
  }[]
}

/**
 * @description: 获取当前登录用户项目列表API
 * @return {Promise<ProjectListResponse>} 返回数据为项目列表(包含项目id和标题)
 */
const reqProjectList = (): Promise<ProjectListResponse> => mockAjax.get('/projectList')

export default reqProjectList
