import { showHoverPrompt } from 'modules/prompt'

/**
 * @description: 鼠标移入事件
 * @param {MouseEvent} e 鼠标事件
 * @return {void}
 */
const mouseoverTrackList = (e: MouseEvent) => {
  const path = e.composedPath()
  let targetName = '' // 触发的元素
  let target = null
  for (let i = 0; i < path.length; i++) {
    const dom = <HTMLElement>path[i]
    const dataset = dom.dataset
    if (dataset.name == 'mute') {
      targetName = 'mute'
      target = dom
      break
    } else if (dataset.name == 'solo') {
      targetName = 'solo'
      target = dom
      break
    } else if (dataset.name == 'item') {
      return
    }
  }
  if (targetName == 'mute') {
    // 因为需要传入的是鼠标事件对象，其target属性应该是个dom元素
    showHoverPrompt(<MouseEvent>{ target }, '静音 开/关')
  } else if (targetName == 'solo') {
    showHoverPrompt(<MouseEvent>{ target }, '独奏 开/关')
  }
}

export default mouseoverTrackList
