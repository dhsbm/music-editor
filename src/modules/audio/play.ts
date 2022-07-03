import { workerCanvasData, editorCanvasData } from 'modules/canvas'
import { indicatorData } from 'modules/indicator'
import { overlayData } from 'modules/overlay'
import { convertBeatTime } from 'modules/tools'
import { ConvertDir } from 'modules/tools/Interfacs'
import { playData, playMeter, palyMusic } from '.'

let oldStart: number
let timer: number
let oldWorkerLeftBeat: number, oldEditorLeftBeat: number

/**
 * @description: 播放/暂停
 * @return {void}
 */
const play = (on_off: boolean) => {
  playData.playing = on_off

  if (on_off == false) {
    indicatorData.start = oldStart
    workerCanvasData.leftBeat = oldWorkerLeftBeat
    editorCanvasData.leftBeat = oldEditorLeftBeat
    clearInterval(timer)

    // 停止播放
  } else {
    oldStart = indicatorData.start
    oldWorkerLeftBeat = workerCanvasData.leftBeat
    oldEditorLeftBeat = editorCanvasData.leftBeat

    const timeout = 20
    const step = convertBeatTime(ConvertDir.TimeToBeat, timeout / 1000)
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

    // 播放节拍器
  }
  palyMusic()
  playMeter()
}

export default play
