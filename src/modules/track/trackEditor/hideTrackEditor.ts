import { trackEditorData } from '..'

/**
 * @description: 隐藏音轨编辑器
 * @return {void}
 */
const hideTrackEditor = () => {
  trackEditorData.show = false
  trackEditorData.track = undefined
}

export default hideTrackEditor
