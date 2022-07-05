import { showSourceEditor } from 'modules/track'
import { moveTrack, showTrackEditor, showTrackMenu, switchMute, switchSolo, trackData } from '.'
import { Track } from '@/class'

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
  outer: for (let i = 0; i < path.length; i++) {
    const dom = <HTMLElement>path[i]
    const dataset = dom.dataset
    switch (dataset.name) {
      case 'name':
        target = 'name'
        break
      case 'mute':
        target = 'mute'
        break
      case 'solo':
        target = 'solo'
        break
      case 'source':
        target = 'source'
        break
      case 'edit':
        target = 'edit'
        break
      case 'item':
        trackId = parseInt(<string>dataset.trackid)
        break outer
    }
  }

  if (trackId != -1) {
    trackData.selectedTrack = Track.getTrack(trackId)
  } else {
    return
  }
  if (e.button == 2) {
    target == 'name' && showTrackMenu(e)
  } else if (e.button == 0) {
    if (dblclick) {
      showTrackEditor(trackData.selectedTrack)
      return
    }
    switch (target) {
      case 'name':
        trackData.trackOrder.length > 1 && moveTrack(e, trackId)
        break
      case 'mute':
        switchMute(trackData.selectedTrack)
        break
      case 'solo':
        switchSolo(trackData.selectedTrack)
        break
      case 'source':
        target = 'source'
        showSourceEditor(trackData.selectedTrack)
        break
      case 'edit':
        target = 'edit'
        showTrackEditor(trackData.selectedTrack)
        break
    }
  }
}

export default mousedownTrackList
