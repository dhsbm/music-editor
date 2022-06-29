import { recordHistory } from 'modules/history'
import { drawPattern, selectPattern } from '.'
import { Pattern } from '@/class'

/**
 * @description: 裁剪音谱
 * @param {Pattern} pattern 要裁剪的音谱
 * @param {number} middle 裁剪的位置
 * @return {void}
 */
const tailorPattern = (pattern: Pattern, middle: number) => {
  const newPattern = pattern.clone()
  pattern.end = middle
  newPattern.start = middle
  newPattern.addSelf()
  drawPattern(newPattern)
  selectPattern(newPattern)
  recordHistory({
    type: 2,
    describe: '裁剪音谱',
    target: pattern,
    target2: newPattern,
  })
}

export default tailorPattern
