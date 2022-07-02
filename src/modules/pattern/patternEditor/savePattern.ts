import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { drawPattern, patternEditorData } from '..'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 保存音谱参数的修改
 * @return {void}
 */
const savePattern = () => {
  const { clone, pattern } = patternEditorData
  const difference = []
  if (clone && pattern) {
    for (const key of <[]>Object.keys(clone)) {
      if (clone[key] != pattern[key]) {
        difference.push({
          key,
          oldData: pattern[key],
          newData: clone[key],
        })
        pattern[key] = clone[key]
      }
    }
    if (difference.length > 0) {
      recordHistory({
        type: HistoryType.Pattern,
        describe: '修改音谱参数',
        target: toRaw(pattern),
        difference,
      })
    }
    drawPattern(pattern)
  }
}

export default savePattern
