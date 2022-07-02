import { Dot } from '@/class'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { toRaw } from 'vue'
import { selectedDotList, drawDotData, dotEditorData } from '.'

/**
 * @description: 删除包络节点
 * @param {Dot} dot 要删除的节点
 * @param {boolean} record 是否要记录本次操作
 * @return {void}
 */
const deleteDot = (dot: Dot, record = true) => {
  dot.deleteSelf()
  selectedDotList.delete(dot)
  drawDotData(dot.dotData)

  if (dot == toRaw(dotEditorData.dot)) {
    dotEditorData.dot = undefined
    dotEditorData.clone = undefined
  }
  if (record) {
    drawDotData(dot.dotData)
    recordHistory({
      type: HistoryType.Dot,
      describe: '删除包络节点',
      target: [dot],
    })
  }
}

export default deleteDot
