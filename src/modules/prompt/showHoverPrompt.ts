import { debounce } from 'modules/tools'
import { hoverPromptData } from '.'

/**
 * @description: 展示提示信息
 * @param {MouseEvent} e 鼠标事件对象
 * @param {string} text 要展示的文本
 * @param { 'top' | 'bottom'} arrowDirection 箭头方向 可选值：top bottom
 * @return {null}
 */
const showHoverPrompt = (e: MouseEvent, text: string, arrowDirection: 'top' | 'bottom' = 'top') => {
  _showHoverPrompt(e, text, arrowDirection)
}

const _showHoverPrompt = debounce((e: MouseEvent, text: string, arrowDirection: 'top' | 'bottom') => {
  const rect = (<Element>e.target).getBoundingClientRect()
  hoverPromptData.text = text
  hoverPromptData.show = true
  hoverPromptData.style.left = rect.left + rect.width / 2 + 'px'
  if (arrowDirection == 'top') {
    hoverPromptData.style.top = rect.top + rect.height + 10 + 'px'
  } else if (arrowDirection == 'bottom') {
    hoverPromptData.style.top = rect.top - 10 + 'px'
  }
}, 300)
hoverPromptData.debounced = _showHoverPrompt
export default showHoverPrompt
