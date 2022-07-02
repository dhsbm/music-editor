import { showCenterPrompt } from 'modules/prompt'
import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { dotEditorData, drawDotData } from '..'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 保存音节参数的修改
 * @return {void}
 */
const saveDot = () => {
  const { clone, dot } = dotEditorData
  if (clone && dot) {
    if (clone.y > 0 && clone.y < 1) {
      if (clone.y != dot.y) {
        dot.y = clone.y
        recordHistory({
          type: HistoryType.Dot,
          describe: '修改节点参数',
          target: toRaw(dot),
          difference: [{ key: 'y', oldData: dot.y, newData: clone.y }],
        })
        drawDotData(dot.dotData)
      }
    } else {
      clone.y = dot.y
      showCenterPrompt('参数不合法')
    }
  }
}

export default saveDot
