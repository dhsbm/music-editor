import { drawPattern } from '.'
import { Pattern } from '@/class'

/**
 * @description: 绘制所有同源音谱
 * @param {Pattern} pattern 样本音谱
 * @return {void}
 */
const drawSimilarPattern = (pattern: Pattern) => {
  for (const patternId of pattern.noteData.patternIdSet) {
    drawPattern(Pattern.getPattern(patternId))
  }
}

export default drawSimilarPattern
