import { Project } from '@/class'
import { showCenterPrompt } from 'modules/prompt'
import { unzip } from 'modules/tools'
import { loadProject } from '.'

/**
 * @description: 导入项目文件
 * @return {void}
 */
const importProject = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = () => {
    const file = input.files![0]
    const reader = new FileReader()
    reader.readAsText(file, 'utf-8')
    reader.onload = () => {
      try {
        const obj = JSON.parse(unzip(<string>reader.result))
        const project = Project.parse(obj)
        loadProject(project)
      } catch (e) {
        showCenterPrompt('文件加载失败，请导入正确文件')
      }
    }
  }
}

export default importProject
