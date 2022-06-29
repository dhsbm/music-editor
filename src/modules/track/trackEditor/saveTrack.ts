import { toRaw } from 'vue'
import { recordHistory } from 'modules/history'
import { trackEditorData } from '..'

/**
 * @description: 保存音轨参数的修改
 * @return {void}
 */
const saveTrack = () => {
  const { clone, track } = trackEditorData
  const difference = []
  if (clone && track) {
    for (const key of <[]>Object.keys(clone)) {
      if (clone[key] != track[key]) {
        difference.push({
          key,
          oldData: track[key],
          newData: clone[key],
        })
        track[key] = clone[key]
      }
    }
  }

  if (difference.length > 0) {
    recordHistory({
      type: 1,
      describe: '修改音轨参数',
      target: toRaw(track),
      difference,
    })
  }
}

export default saveTrack
