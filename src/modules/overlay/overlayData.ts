import { reactive, computed } from 'vue'
import { playData } from 'modules/audio'
import { workerCanvasData } from 'modules/canvas'

// 遮罩层数据
const overlayData: OverlayDate = reactive({
  // 这里的单位时beat
  start: 0,
  end: 2,
  changeStart: false,
  changeEnd: false,
  // 音谱编辑器的颜色
  color: computed(() => (playData.cycle ? 'blue' : 'grey')),
  // 音谱编辑器的样式
  style: {
    transform: computed(
      () => 'translateX(' + workerCanvasData.beatWidth * (overlayData.start - workerCanvasData.leftBeat) + 'px)'
    ),
    width: computed(() => workerCanvasData.beatWidth * (overlayData.end - overlayData.start) + 'px'),
    background: computed(() => overlayData.color),
  },
})

export default overlayData

interface OverlayDate {
  start: number
  end: number
  changeStart: boolean
  changeEnd: boolean
  color: 'blue' | 'grey'
  style: {
    transform: string
    width: string
    background: string
  }
}
