import { historyData } from 'modules/history'
import { saveProject } from 'modules/project'
import { savePromptData } from '.'

/**
 * @description: 关闭保存弹窗 根据传参选择是否保存
 * @param {boolean} save
 * @return {null}
 */
const hideSavePrompt = (save: boolean) => {
  if (save) {
    saveProject()
  }
  historyData.newStep = historyData.oldStep = 0
  if (savePromptData.fun) {
    savePromptData.fun()
    savePromptData.fun = undefined
  }
  savePromptData.show = false
}

export default hideSavePrompt
