import { reactive, watch } from 'vue'
import { editorCanvasRender, workerCanvasRender } from 'modules/canvas'
// import { showSynthesizer } from 'modules/synthesizer'
import { Track } from '@/class'

const trackEditorData: TrackEditorData = reactive({
  show: false, // 音轨编辑器显示/隐藏
  track: undefined, // 绑定的音轨
  clone: undefined, // 克隆的数据
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

// watch(
//   () => trackEditorData.clone?.source,
//   (now, pre) => {
//     // if (now == 5 && pre) showSynthesizer()
//   }
// )
watch(
  () => trackEditorData.track?.color,
  () => {
    workerCanvasRender()
    editorCanvasRender()
  }
)

export default trackEditorData

interface TrackEditorData {
  show: boolean
  track?: Track
  clone?: {
    name: string
    color: string
    volume: number
    source: number
  }
  style: {
    zIndex: number
    transform: string
  }
}
