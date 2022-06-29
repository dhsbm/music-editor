import { dotEditorData } from '..'

/**
 * @description: 隐藏音节编辑器
 * @return {void}
 */
const hideDotEditor = () => {
  dotEditorData.dot = undefined
  dotEditorData.clone = undefined
  dotEditorData.show = false
}

export default hideDotEditor
