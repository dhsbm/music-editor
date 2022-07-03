import { workerCanvasData, editorCanvasData } from 'modules/canvas'
import { indicatorData } from 'modules/indicator'
import { palyMusic, playMeter } from '.'
/**
 * @description: 跳到开头
 * @return {void}
 */
const backToStart = () => {
  workerCanvasData.leftBeat = editorCanvasData.leftBeat = indicatorData.start = 0
  playMeter()
  palyMusic()
}

export default backToStart
