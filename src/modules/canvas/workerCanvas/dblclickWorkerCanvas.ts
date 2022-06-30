import { addPattern, findPointPattern, showContentEditor } from 'modules/pattern'
import { globalData, mode } from 'modules/globalData'
import { addEnvelope, findPointEnvelope } from 'modules/envelope'
import { addDot, deleteDot } from 'modules/dot'
import { Mode } from 'modules/globalData/Interface'

/**
 * @description: 双击工作区画布，打开内容编辑器/添加乐谱
 * @param {MouseEvent} e 鼠标事件对象
 * @return {void}
 */
const dblclickWorkerCanvas = (e: MouseEvent) => {
  const { pointPattern } = findPointPattern(e)
  if (pointPattern) {
    // 打开内容编辑器
    showContentEditor(pointPattern)
    return
  }
  const { pointEnvelope, dot } = findPointEnvelope(e)
  if (pointEnvelope) {
    if (dot) {
      deleteDot(dot)
    } else {
      addDot(e, pointEnvelope)
    }
    return
  }

  if (mode.value == Mode.Select) {
    globalData.shift ? addEnvelope(e) : addPattern(e)
  }
}

export default dblclickWorkerCanvas
