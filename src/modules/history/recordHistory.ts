import { HistoryItem, HistoryType } from './Interface'
import { nextTick } from 'vue'
import { historyList, historyData } from '.'

/**
 * @description: 记录历史函数
 * @param {HistoryItem} obj 传入特定的记录对象
 * @return {void}
 */
const recordHistory = (obj: HistoryItem) => {
  historyList[++historyData.index] = obj
  historyData.lastIndex = historyData.index
  if (obj.type == HistoryType.Init) historyData.newStep--
  historyData.newStep++
  nextTick(() => {
    historyData.show && (historyData.historyContainer.scrollTop = historyList.length * 22)
  })
}

export default recordHistory
