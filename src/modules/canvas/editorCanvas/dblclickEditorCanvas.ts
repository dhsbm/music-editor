import { addNote, findPointNote } from 'modules/note'
import { mode } from 'modules/globalData'

/**
 * @description: 双击编辑器画布，打开音节编辑器/添加音节
 * @param {MouseEvent} e 鼠标事件
 * @return {void}
 */
const dblclickEditorCanvas = (e: MouseEvent) => {
  const { pointNote } = findPointNote(e)
  if (pointNote) {
    return
  } else if (mode.value == 1) {
    addNote(e)
  }
}

export default dblclickEditorCanvas
