import { mockAjax, ResponseInterface } from '..'

interface PublishCompositionParams {
  title: string // 文章标题
  projectId: number // 项目id
  tags: string[] // 文章标签
  content: string // 文章内容
}
interface PublishCompositionResponse extends ResponseInterface {
  data: null
}

/**
 * @description: 发布文章API
 * @param {PublishCompositionParams} option 文章参数
 * @return {*} 返回数据无内容
 */
const reqPublishComposition = (option: PublishCompositionParams): Promise<PublishCompositionResponse> =>
  mockAjax.put('/composition', option)

export default reqPublishComposition
