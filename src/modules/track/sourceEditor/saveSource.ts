import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { sourceEditorData } from '..'
import { HistoryType } from 'modules/history/Interface'

/**
 * @description: 保存音轨参数的修改
 * @return {void}
 */
const saveTrack = () => {
  const { clone, track } = sourceEditorData
  const difference = []
  if (clone && track) {
    const source = track.source
    for (const key of <[]>Object.keys(clone)) {
      if (clone[key] != source[key]) {
        difference.push({
          key,
          oldData: source[key],
          newData: clone[key],
        })
        source[key] = clone[key]
      }
    }
  }

  if (difference.length > 0) {
    recordHistory({
      type: HistoryType.Track,
      describe: '修改音源参数',
      target: toRaw(track),
      difference,
    })
  }
}

export default saveTrack
