import { Pattern } from '@/class'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 使音谱的数据独立
 * @param {Pattern} pattern 要独立的音谱
 * @return {void}
 */
const independPattern = (pattern: Pattern) => {
  const noteData = pattern.noteData
  const newNoteData = noteData.clone()
  noteData.deletePattern(pattern)
  pattern.noteData = newNoteData
  newNoteData.addPattern(pattern)

  recordHistory({
    type: HistoryType.Pattern,
    describe: '独立音谱',
    target: pattern,
    oldNoteData: noteData,
    newNoteData: newNoteData,
  })
}

export default independPattern
