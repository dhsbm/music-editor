import { patternEditorData } from '..'

/**
 * @description: 隐藏音谱编辑器
 * @return {void}
 */
const hidePatternEditor = () => {
  patternEditorData.pattern = undefined
  patternEditorData.clone = undefined
  patternEditorData.show = false
}

export default hidePatternEditor
