import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { dotEditorData, drawDotData } from '..'

/**
 * @description: 保存音节参数的修改
 * @return {void}
 */
const saveDot = () => {
  const { clone, dot } = dotEditorData
  const difference = []
  if (clone && dot) {
    for (const key of <[]>Object.keys(clone)) {
      if (clone[key] != dot[key]) {
        difference.push({
          key,
          oldData: dot[key],
          newData: clone[key],
        })
        dot[key] = clone[key]
      }
    }
    drawDotData(dot.dotData)
  }

  if (difference.length > 0) {
    recordHistory({
      type: 5,
      describe: '修改节点参数',
      target: toRaw(dot),
      difference,
    })
  }
}

export default saveDot
