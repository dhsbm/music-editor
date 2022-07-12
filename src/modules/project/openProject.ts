import { showCenterPrompt } from 'modules/prompt'
import { reqProjectData } from '@/api'
import { Project } from '@/class'
import { unzip } from 'modules/tools'
import { loadProject } from '.'

/**
 * @description: 打开项目
 * @param {number} projectId 项目id
 * @return {Promise<void>}
 */
const openProject = async (projectId: number) => {
  const response = await reqProjectData(projectId)
  let project
  if (response.code == 200 && response.data) {
    const projectData = unzip(response.data)
    project = Project.parse(JSON.parse(projectData))
  } else {
    showCenterPrompt('网络不良，项目加载失败')
    project = new Project()
  }

  loadProject(project)
}

export default openProject
