import { centerPromptData } from '.'

/**
 * @description: 隐藏中央提示
 * @return {void}
 */
const hideCenterPrompt = () => {
  clearTimeout(centerPromptData.timer)
  centerPromptData.style.opacity = 0
  centerPromptData.style.pointerEvents = 'none'
}

export default hideCenterPrompt
