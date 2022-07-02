import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { noteEditorData } from '..'

/**
 * @description: 保存音节参数的修改
 * @return {void}
 */
const saveNote = () => {
  const { clone, note } = noteEditorData
  const difference = []
  if (clone && note) {
    for (const key of <[]>Object.keys(clone)) {
      if (clone[key] != note[key]) {
        difference.push({
          key,
          oldData: note[key],
          newData: clone[key],
        })
        note[key] = clone[key]
      }
    }
  }
  if (difference.length > 0) {
    recordHistory({
      type: 3,
      describe: '修改音节参数',
      target: toRaw(note),
      difference,
    })
  }
}

export default saveNote
