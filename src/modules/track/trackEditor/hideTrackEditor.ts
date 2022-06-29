import { trackEditorData } from '..'

/**
 * @description: 隐藏音轨编辑器
 * @param {null}
 * @return {null}
 */
const hideTrackEditor = () => {
  trackEditorData.show = false
  trackEditorData.track = undefined
}

export default hideTrackEditor
