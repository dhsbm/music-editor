import { selectedEnvelopeList, drawEnvelope } from 'modules/envelope'
import { drawPattern, drawSelectedPattern, selectedPatternList } from '.'
import { Pattern } from '@/class'

/**
 * @description: 添加音谱到选择区
 * @param {Pattern} [pattern] 添加的音谱实例，默认为null不添加
 * @param {boolean} [clear] 添加前是否需要清空选择区，默认清空
 * @return {void}
 */
const selectPattern = (pattern: Pattern | undefined = undefined, clear = true) => {
  if (clear) {
    for (const envelope of selectedEnvelopeList) {
      selectedEnvelopeList.delete(envelope)
      drawEnvelope(envelope)
    }
    for (const pattern of selectedPatternList) {
      selectedPatternList.delete(pattern)
      drawPattern(pattern)
    }
  }
  if (pattern) {
    selectedPatternList.delete(pattern)
    selectedPatternList.add(pattern)
    drawSelectedPattern()
  }
}

export default selectPattern
