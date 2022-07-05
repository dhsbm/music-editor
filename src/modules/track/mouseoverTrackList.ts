import { showHoverPrompt } from 'modules/prompt'

/**
 * @description: 鼠标移入事件
 * @param {MouseEvent} e 鼠标事件
 * @return {void}
 */
const mouseoverTrackList = (e: MouseEvent) => {
  const path = e.composedPath()
  for (let i = 0; i < path.length; i++) {
    const dom = <HTMLElement>path[i]
    const dataset = dom.dataset
    switch (dataset.name) {
      case 'name':
        return
      case 'mute':
        showHoverPrompt(<MouseEvent>(<any>{ target: dom }), '静音 开/关', 'bottom')
        return
      case 'solo':
        showHoverPrompt(<MouseEvent>(<any>{ target: dom }), '独奏 开/关', 'bottom')
        return
      case 'source':
        showHoverPrompt(<MouseEvent>(<any>{ target: dom }), '音源编辑器', 'bottom')
        break
      case 'edit':
        showHoverPrompt(<MouseEvent>(<any>{ target: dom }), '参数编辑器', 'bottom')
        break
      case 'item':
        return
    }
  }
}

export default mouseoverTrackList
