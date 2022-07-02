import { Note } from '@/class'
import { selectNote } from '.'

/**
 * @description: 选择同行所有音节
 * @param {Note} note 音节
 * @return {void}
 */
const selectRowNote = (note: Note) => {
  selectNote()
  for (const n of note.noteData.noteMap.get(note.row)!) {
    selectNote(n, false)
  }
}

export default selectRowNote
