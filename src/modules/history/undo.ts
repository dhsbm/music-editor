import { editorCanvasRender, workerCanvasRender } from 'modules/canvas'
import { deleteTrack, showSourceEditor, showTrackEditor, trackData } from 'modules/track'
import { deletePattern, showPatternEditor } from 'modules/pattern'
import { deleteNote, showNoteEditor } from 'modules/note'
import { historyList, historyData } from '.'
import { deleteEnvelope, showEnvelopeEditor } from 'modules/envelope'
import { deleteDot, showDotEditor } from 'modules/dot'
import { Envelope, Track } from '@/class'
import { HistoryType } from './Interface'

/**
 * @description: 撤销函数
 * @param {boolean} [needRender] 是否需要重绘 (连续进行多次撤回时为false)
 * @return {void}
 */
const undo = (needRender = true) => {
  if (historyData.index == 0) return
  if (historyData.newStep > 0) historyData.newStep--
  else historyData.oldStep--
  const historyEvent = historyList[historyData.index--]
  const { type, describe, target } = historyEvent
  if (type == HistoryType.Track) {
    // 音轨操作
    if (describe == '添加音轨') {
      deleteTrack(target.trackId, false)
    } else if (describe == '删除音轨') {
      trackData.trackOrder.splice(historyEvent.index, 0, target.trackId)
      // 恢复作用于此音轨的包络
      for (const envelopeId of target.envelopeIdList) {
        const envelope = Envelope.getEnvelope(envelopeId)
        envelope.addSelf()
      }
      // 恢复包络的同时绑定音轨
      for (const envelopeId of target.envelopeIdSet) {
        const envelope = Envelope.getEnvelope(envelopeId)
        envelope.actTrackId && envelope.actTrack.actEnvelope(envelope)
      }
    } else if (describe == '移动音轨') {
      trackData.trackOrder = historyEvent.oldOrder
    } else if (describe == '修改音轨参数') {
      for (const { key, oldData } of historyEvent.difference) {
        target[key] = oldData
      }
      showTrackEditor(target)
    } else if (describe == '修改音源参数') {
      const source = target.source
      for (const { key, oldData } of historyEvent.difference) {
        source[key] = oldData
      }
      showSourceEditor(target)
      needRender = false
    }
    if (needRender) workerCanvasRender()
  } else if (type == HistoryType.Pattern) {
    // 音谱操作
    if (describe == '添加音谱' || describe == '粘贴音谱') {
      for (const pattern of target) deletePattern(pattern, false)
    } else if (describe == '删除音谱') {
      for (const pattern of target) pattern.addSelf()
    } else if (describe == '裁剪音谱') {
      target.end = historyEvent.target2.end
      deletePattern(historyEvent.target2, false)
    } else if (describe == '移动音谱' || describe == '伸缩音谱') {
      const { difX, difRow, changeStart, changeEnd } = historyEvent
      for (const pattern of target) {
        if (difRow != 0) {
          pattern.track.deletePattern(pattern)
          const row = trackData.trackOrder.indexOf(pattern.track.trackId) - difRow
          pattern.trackId = trackData.trackOrder[row]
          pattern.track.addPattern(pattern)
        }
        if (changeStart) pattern.start -= difX
        if (changeEnd) pattern.end -= difX
        if (changeStart && changeEnd) pattern.offsetX -= difX
      }
    } else if (describe == '修改音谱参数') {
      for (const { key, oldData } of historyEvent.difference) {
        target[key] = oldData
      }
      showPatternEditor(target)
      needRender = false
    } else if (describe == '独立音谱') {
      const { oldNoteData, newNoteData } = historyEvent
      newNoteData.deletePattern(target)
      target.noteData = oldNoteData
      oldNoteData.addPattern(target)
      needRender = false
    }
    if (needRender) workerCanvasRender()
  } else if (type == HistoryType.Note) {
    // 音节操作
    if (describe == '添加音节' || describe == '粘贴音节') {
      for (const note of target) deleteNote(note, false)
    } else if (describe == '删除音节') {
      for (const note of target) note.addSelf()
    } else if (describe == '裁剪音节') {
      target.end = historyEvent.oldEnd
      deleteNote(historyEvent.target2, false)
    } else if (describe == '移动音节' || describe == '伸缩音节') {
      const { difX, difRow, changeStart, changeEnd } = historyEvent
      for (const note of target) {
        if (changeStart) note.start -= difX
        if (changeEnd) note.end -= difX
        if (difRow != 0) {
          note.deleteSelf()
          note.row -= difRow
          note.addSelf()
        }
      }
    } else if (describe == '修改音节参数') {
      for (const { key, oldData } of historyEvent.difference) {
        target[key] = oldData
      }
      showNoteEditor(target)
      needRender = false
    }
    if (needRender) editorCanvasRender()
  } else if (type == HistoryType.Envelop) {
    if (describe == '添加包络' || describe == '粘贴包络') {
      for (const envelope of target) deleteEnvelope(envelope, false)
    } else if (describe == '删除包络') {
      for (const envelope of target) envelope.addSelf()
    } else if (describe == '裁剪包络') {
      target.end = historyEvent.target2.end
      deleteEnvelope(historyEvent.target2, false)
    } else if (describe == '移动包络' || describe == '伸缩包络') {
      const { difX, difRow, changeStart, changeEnd } = historyEvent
      for (const envelope of target) {
        if (difRow != 0) {
          envelope.track.deleteEnvelope(envelope)
          const row = trackData.trackOrder.indexOf(envelope.track.trackId) - difRow
          envelope.trackId = trackData.trackOrder[row]
          envelope.track.addEnvelope(envelope)
        }
        if (changeStart) envelope.start -= difX
        if (changeEnd) envelope.end -= difX
        if (changeStart && changeEnd) envelope.offsetX -= difX
      }
    } else if (describe == '修改包络参数') {
      for (const { key, oldData, newData } of historyEvent.difference) {
        target[key] = oldData
        if (key == 'actTrackId') {
          newData != 0 && Track.getTrack(newData).removeEnvelope(target)
          oldData != 0 && Track.getTrack(oldData).actEnvelope(target)
        }
      }
      showEnvelopeEditor(target)
    } else if (describe == '独立包络') {
      const { oldDotData, newDotData } = historyEvent
      newDotData.deleteEnvelope(target)
      target.dotDataId = oldDotData.dotDataId
      oldDotData.addEnvelope(target)
      needRender = false
    }

    if (needRender) workerCanvasRender()
  } else if (type == HistoryType.Dot) {
    if (describe == '添加包络节点') {
      for (const dot of target) deleteDot(dot, false)
    } else if (describe == '删除包络节点') {
      for (const dot of target) dot.addSelf()
    } else if (describe == '移动包络节点') {
      const { oldData } = historyEvent
      let i = 0
      for (const dot of target) {
        dot.x = oldData[i].x
        dot.y = oldData[i].y
        i++
      }
    } else if (describe == '修改节点参数') {
      for (const { key, oldData } of historyEvent.difference) {
        target[key] = oldData
      }
      showDotEditor(target)
    }

    if (needRender) workerCanvasRender()
  }
}

export default undo
