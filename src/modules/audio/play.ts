import { workerCanvasData, editorCanvasData } from 'modules/canvas'
import { indicatorData } from 'modules/indicator'
import { hideMask, showMask } from 'modules/mask'
import { overlayData } from 'modules/overlay'
import { showCenterPrompt } from 'modules/prompt'
import { timeToBeat } from 'modules/tools'
import { playData, playMeter, palyMusic, getAudioData } from '.'

let oldStart: number
let timer: number
let oldWorkerLeftBeat: number, oldEditorLeftBeat: number

/**
 * @description: 播放/暂停
 * @return {void}
 */
const play = (on_off: boolean) => {
  playData.playing = on_off
  getAudioData(on_off)

  if (on_off == false) {
    // 停止播放
    indicatorData.start = oldStart
    workerCanvasData.leftBeat = oldWorkerLeftBeat
    editorCanvasData.leftBeat = oldEditorLeftBeat
    clearInterval(timer)
    hideMask()
  } else {
    // 开始播放
    showMask(() => showCenterPrompt('播放期间禁止操作，请先暂停播放'), true)
    oldStart = indicatorData.start
    oldWorkerLeftBeat = workerCanvasData.leftBeat
    oldEditorLeftBeat = editorCanvasData.leftBeat

    const timeout = 20
    const step = timeToBeat(timeout / 1000)
    let litter = indicatorData.start < overlayData.end // 记录上一时刻指针是否小于循环结束位置

    timer = setInterval(() => {
      // 循环了
      if (playData.cycle && indicatorData.start >= overlayData.end && litter) {
        indicatorData.start = overlayData.start
        workerCanvasData.leftBeat = oldWorkerLeftBeat
        editorCanvasData.leftBeat = oldEditorLeftBeat
        palyMusic()
        playMeter()
      }
      litter = indicatorData.start < overlayData.end

      // 当指针移出画布时，移动画布
      if (indicatorData.start >= workerCanvasData.rightBeat) {
        workerCanvasData.leftBeat = indicatorData.start
      }
      if (indicatorData.start >= editorCanvasData.rightBeat) {
        editorCanvasData.leftBeat = indicatorData.start
      }
      indicatorData.start += step
    }, timeout)
  }
  // 播放节拍器
  palyMusic()
  playMeter()
}

export default play
