import { selectPattern, drawSelectedPattern } from '.'
import { Pattern } from '@/class'

/**
 * @description: 选择所有公用一份音节数据的音谱
 * @param {Pattern} pattern 样本音谱
 * @return {void}
 */
const selectSimilarPattern = (pattern: Pattern) => {
  selectPattern() // 清空选区
  for (const patternId of pattern.noteData.patternIdSet) {
    selectPattern(Pattern.getPattern(patternId), false)
  }
  drawSelectedPattern()
}

export default selectSimilarPattern
