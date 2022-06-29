import { globalData } from 'modules/globalData'
import { saveProjectWindowData, getProjectDetail } from '.'
import { showCenterPrompt } from 'modules/prompt'
import { reqSaveProject } from '@/api'
// todos
/**
 * @description: 另存为项目
 * @return {void}
 */
const saveAsProject = async () => {
  const { project } = globalData
  const preTitle = project.title
  const preIntroduce = project.introduce
  const preId = project.projectId
  project.title = saveProjectWindowData.title
  project.introduce = saveProjectWindowData.introduce
  let response
  try {
    const projectId = globalData.project.patternId
    response = await reqSaveProject(projectId, getProjectDetail())
  } catch (e) {
    console.log(e)
  }
  project.title = preTitle
  project.introduce = preIntroduce
  project.projectId = preId

  if (response?.code == 200) {
    showCenterPrompt('保存成功')
  } else {
    showCenterPrompt('保存失败，请稍后重试')
  }
}

export default saveAsProject
