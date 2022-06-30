import { editorCanvasRender, workerCanvasRender } from 'modules/canvas'
import { historyData, undo, redo } from '.'

/**
 * @description: 一次性进行多步撤销/重做操作
 * @param {number} i 要前往的历史索引
 * @return {void}
 */
const changeHistoryIndex = (i: number) => {
  for (; historyData.index > i; ) undo(false)
  for (; historyData.index < i; ) redo(false)
  workerCanvasRender()
  editorCanvasRender()
}

export default changeHistoryIndex
