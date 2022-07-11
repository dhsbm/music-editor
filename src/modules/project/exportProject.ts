import { Project } from '@/class'
import { globalData } from 'modules/globalData'

/**
 * @description: 导出项目文件 自动下载
 * @return {void}
 */
const exportProject = () => {
  const projectData = Project.stringify(globalData.project)
  const blob = new Blob([projectData], { type: 'text/plain' })
  let a = globalData.a
  if (!a) {
    a = document.createElement('a')
    globalData.a = a
  }
  a.href = window.URL.createObjectURL(blob)
  a.download = globalData.project.projectTitle + '.pro'
  a.click()
}

export default exportProject
