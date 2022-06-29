import { centerPromptData, hideCenterPrompt } from '.'

/**
 * @description: 显示中央提示
 * @param {string} text 要显示的文本
 * @return {void}
 */
const showCenterPrompt = (text: string) => {
  clearTimeout(centerPromptData.timer)
  centerPromptData.style.opacity = 1
  centerPromptData.style.pointerEvents = 'auto'
  centerPromptData.content = text
  centerPromptData.timer = setTimeout(() => {
    hideCenterPrompt()
  }, 1500)
}

export default showCenterPrompt
