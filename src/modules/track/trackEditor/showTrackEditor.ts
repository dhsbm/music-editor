import { trackEditorData } from '..'
import { changeZIndex } from 'modules/tools'
import { Track } from '@/class'
/**
 * @description: 显示音轨编辑器
 * @param {Track} track 绑定的音轨
 * @return {void}
 */
const showTrackEditor = (track: Track) => {
  console.log(track)
  trackEditorData.show = true
  trackEditorData.track = track // 绑定音轨
  trackEditorData.clone = {
    trackTitle: track.trackTitle,
    color: track.color,
    volume: track.volume,
  }
  changeZIndex(trackEditorData.style)
}

export default showTrackEditor
