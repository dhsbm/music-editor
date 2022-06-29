import { DotData } from '@/class'
import { recordHistory } from 'modules/history'
import { deleteDot, drawDotData, selectedDotList } from '.'

/**
 * @description: 删除选择区所有节点
 * @return {void}
 */
const deleteSelectedDot = () => {
  if (selectedDotList.size == 0) return
  recordHistory({ type: 5, describe: '删除包络节点', target: [...selectedDotList] })
  let dotData
  for (const dot of selectedDotList) {
    deleteDot(dot, false)
    dotData = dot.dotData
  }
  selectedDotList.clear()
  drawDotData(<DotData>dotData)
}

export default deleteSelectedDot
