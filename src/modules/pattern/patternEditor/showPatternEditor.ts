import { changeZIndex } from 'modules/tools'
import { patternEditorData } from '..'
import { Pattern } from '@/class'

/**
 * @description: 打开音谱编辑器
 * @param {Pattern} pattern 要绑定的音谱
 * @return {void}
 */
const showPatternEditor = (pattern: Pattern) => {
  patternEditorData.show = true
  patternEditorData.pattern = pattern
  patternEditorData.clone = {
    patternTitle: pattern.patternTitle,
    volume: pattern.volume,
  }
  changeZIndex(patternEditorData.style)
}

export default showPatternEditor
