import { recordHistory } from 'modules/history'
import { selectNote } from '.'
import { Note } from '@/class'
import { HistoryType } from 'modules/history/Interface'
/**
 * @description: 裁剪音节
 * @param {Note} note 要裁剪的音节
 * @param {number} middle 裁剪的位置
 * @return {void}
 */
const tailorNote = (note: Note, middle: number) => {
  const newNote = note.clone()
  const oldEnd = note.end
  note.end = middle
  newNote.start = middle
  newNote.addSelf()
  selectNote(newNote)
  recordHistory({
    type: HistoryType.Note,
    describe: '裁剪音节',
    target: note,
    target2: newNote,
    oldEnd,
  })
}

export default tailorNote
