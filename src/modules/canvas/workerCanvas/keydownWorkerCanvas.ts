import { Pattern, Envelope } from '@/class'
import { selectedEnvelopeList, selectEnvelope } from 'modules/envelope'
import { globalData } from 'modules/globalData'
import { recordHistory } from 'modules/history'
import { selectedPatternList, selectPattern } from 'modules/pattern'
import { workerCanvasRender } from '..'

let patternClipboard: Pattern[] = []
let envelopeClipboard: Envelope[] = []
let maxWidth = 0

/**
 * @description: 工作区画布键盘事件 复制粘贴
 * @param {KeyboardEvent} e 键盘事件对象
 * @return {null}
 */
const keydownWorkerCanvas = (e: KeyboardEvent) => {
  if (!globalData.ctrl) return
  const key = e.key.toLocaleLowerCase()
  if (key === 'c') {
    // 复制操作
    patternClipboard = []
    envelopeClipboard = []
    maxWidth = 0
    for (const pattern of selectedPatternList) {
      patternClipboard.push(pattern.clone())
      maxWidth = Math.max(maxWidth, pattern.width)
    }
    for (const envelope of selectedEnvelopeList) {
      envelopeClipboard.push(envelope.clone())
      maxWidth = Math.max(maxWidth, envelope.width)
    }
  } else if (key === 'v') {
    // 粘贴操作 shift按下时为 深拷贝
    selectPattern() // 清空选择区
    const patternList = []
    for (const pattern of patternClipboard) {
      pattern.start += maxWidth
      pattern.end += maxWidth
      pattern.offsetX += maxWidth
      const clone = pattern.clone(globalData.shift)
      patternList.push(clone)
      clone.addSelf()
      selectPattern(clone, false)
    }
    if (patternClipboard.length > 0)
      recordHistory({
        type: 2,
        describe: '粘贴乐谱',
        target: patternList,
      })

    const envelopeList = []
    for (const envelope of envelopeClipboard) {
      envelope.start += maxWidth
      envelope.end += maxWidth
      envelope.offsetX += maxWidth
      const clone = envelope.clone(globalData.shift)
      envelopeList.push(clone)
      clone.addSelf()
      selectEnvelope(clone, false)
    }
    if (envelopeClipboard.length > 0)
      recordHistory({
        type: 4,
        describe: '粘贴包络',
        target: envelopeList,
      })

    workerCanvasRender()
  }
}

export default keydownWorkerCanvas
