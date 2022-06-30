import { workerCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { selectedPatternList, contentEditorData, patternEditorData } from '.'
import { Pattern } from '@/class'
import { HistoryType } from 'modules/history/Interface'
/**
 * @description: 删除音谱
 * @param {Pattern} pattern 要删除的音谱
 * @param {boolean} [record] 是否要记录本次操作
 * @return {void}
 */
const deletePattern = (pattern: Pattern, record = true) => {
  pattern.deleteSelf()
  selectedPatternList.delete(pattern)
  if (pattern.patternId == contentEditorData.pattern?.patternId) contentEditorData.pattern = undefined
  if (pattern.patternId == patternEditorData.pattern?.patternId) patternEditorData.pattern = undefined
  record && workerCanvasRender()
  // 做记录
  if (record) recordHistory({ type: HistoryType.Pattern, describe: '删除音谱', target: [pattern] })
}

export default deletePattern
