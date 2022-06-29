import { Note } from '@/class'
import { drawNote, drawSelectedNote, selectedNoteList } from '.'

/**
 * @description: 添加音节到选择区
 * @param {Note} [note] 要添加选择区的音节，默认为undefined不添加
 * @param {boolean} [clear] 是否需要在添加前清空选择区，默认清空
 * @return {void}
 */
const selectNote = (note: Note | undefined = undefined, clear = true) => {
  if (clear) {
    for (const note of selectedNoteList) {
      selectedNoteList.delete(note)
      drawNote(note)
    }
  }
  if (note) {
    selectedNoteList.delete(note)
    selectedNoteList.add(note)
    drawSelectedNote()
  }
}

export default selectNote
