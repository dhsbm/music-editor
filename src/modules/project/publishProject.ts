import { reqPublishComposition } from '@/api'
import { globalData } from 'modules/globalData'
import { showCenterPrompt } from 'modules/prompt'
import { publishProjectWindowData } from '.'

let sign = false

/**
 * @description: 发布项目
 * @return {void}
 */
const publishProject = async () => {
  if (sign) return
  console.log(globalData.project)
  sign = true
  const data = {
    title: publishProjectWindowData.title,
    projectId: publishProjectWindowData.projectId,
    tags: publishProjectWindowData.tagList,
    content: publishProjectWindowData.article,
  }
  const response = await reqPublishComposition(data)
  if (response.code == 200) {
    showCenterPrompt('发布成功')
  }
  sign = false
}

export default publishProject
