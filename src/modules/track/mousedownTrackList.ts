import { globalData } from 'modules/globalData'
import { moveTrack, showTrackEditor, showTrackMenu, switchMute, switchSolo, trackData } from '.'

/**
 * @description: 鼠标点击事件
 * @param {MouseEvent} e 鼠标事件
 * @param {boolean} dblclick 是否为双击事件
 * @return {void}
 */
const mousedownTrackList = (e: MouseEvent, dblclick = false) => {
  const path = e.composedPath()
  let target = '' // 点击的元素
  let trackId = -1 // 点击的音轨id
  for (let i = 0; i < path.length; i++) {
    const dom = <HTMLElement>path[i]
    const dataset = dom.dataset
    if (dataset.name == 'name') {
      target = 'name'
    } else if (dataset.name == 'mute') {
      target = 'mute'
    } else if (dataset.name == 'solo') {
      target = 'solo'
    } else if (dataset.name == 'item') {
      trackId = parseInt(<string>dataset.trackid)
      break
    }
  }

  if (trackId != -1) {
    trackData.selectedTrack = globalData.project.getTrack(trackId)
  } else {
    return
  }
  if (e.button == 2) {
    target == 'name' && showTrackMenu(e)
  } else if (e.button == 0) {
    if (dblclick) {
      showTrackEditor(trackData.selectedTrack)
      return
    } else if (target == 'name') {
      trackData.trackOrder.length > 1 && moveTrack(e, trackId)
    } else if (target == 'mute') {
      switchMute(trackData.selectedTrack)
    } else if (target == 'solo') {
      switchSolo(trackData.selectedTrack)
    }
  }
}

export default mousedownTrackList
