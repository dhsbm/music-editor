import { contentEditorData } from '..'

/**
 * @description: 隐藏音谱编辑器
 * @param {null}
 * @return {null}
 */
const hideContentEditor = () => {
  contentEditorData.show = false
  contentEditorData.pattern = undefined
}

export default hideContentEditor
