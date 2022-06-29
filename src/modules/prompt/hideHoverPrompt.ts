import { hoverPromptData } from '.'

/**
 * @description: 隐藏提示信息
 * @param {null}
 * @return {null}
 */
const hideHoverPrompt = () => {
  hoverPromptData.debounced.cancel()
  hoverPromptData.show = false
}

export default hideHoverPrompt
