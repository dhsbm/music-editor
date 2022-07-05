import { sourceEditorData } from '..'
import { changeZIndex } from 'modules/tools'
import { Track } from '@/class'
/**
 * @description: 显示音轨编辑器
 * @param {Track} track 绑定的音轨
 * @return {void}
 */
const showSourceEditor = (track: Track) => {
  sourceEditorData.show = true
  sourceEditorData.track = track // 绑定音轨
  sourceEditorData.clone = {
    ...track.source,
  }
  changeZIndex(sourceEditorData.style)
}

export default showSourceEditor
