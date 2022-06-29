import { contentEditorData } from 'modules/pattern'
import { drawNote } from '.'

/**
 * @description: 画所有音节
 * @return {void}
 */
const drawAllNote = () => {
  if (!contentEditorData.pattern) return
  for (const [, noteSet] of contentEditorData.pattern.noteMap) {
    // 这里应该过滤 todos
    for (const note of noteSet) {
      drawNote(note)
    }
  }
}
export default drawAllNote
