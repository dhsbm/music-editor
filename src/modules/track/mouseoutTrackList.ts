import { hideHoverPrompt } from 'modules/prompt'

/**
 * @description: 鼠标移除事件
 * @param {MouseEvent} e 鼠标事件
 * @return {void}
 */
const mouseoutTrackList = (e: MouseEvent) => {
  const path = e.composedPath()
  for (let i = 0; i < path.length; i++) {
    const dom = <HTMLElement>path[i]
    const dataset = dom.dataset
    if (dataset.name == 'mute') {
      hideHoverPrompt()
    } else if (dataset.name == 'solo') {
      hideHoverPrompt()
    } else if (dataset.name == 'item') {
      return
    }
  }
}

export default mouseoutTrackList
