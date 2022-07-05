import { sourceEditorData } from '..'

/**
 * @description: 隐藏音轨编辑器
 * @return {void}
 */
const hideSourceEditor = () => {
  sourceEditorData.show = false
  sourceEditorData.track = undefined
}

export default hideSourceEditor
