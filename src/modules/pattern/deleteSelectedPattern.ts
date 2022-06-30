import { workerCanvasRender } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { deletePattern, selectedPatternList } from '.'

/**
 * @description: 删除选择区所有音节
 * @return {void}
 */
const deleteSelectedPattern = () => {
  if (selectedPatternList.size == 0) return
  recordHistory({ type: HistoryType.Pattern, describe: '删除音谱', target: [...selectedPatternList] })
  for (const pattern of selectedPatternList) {
    deletePattern(pattern, false)
  }
  selectedPatternList.clear()
  workerCanvasRender()
}

export default deleteSelectedPattern
