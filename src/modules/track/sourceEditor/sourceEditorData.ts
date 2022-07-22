import { Source } from 'modules/audio/Interface'
import { reactive } from 'vue'
import { Track } from '@/class'

const sourceEditorData: SourceEditorData = reactive({
  show: false, // 音轨编辑器显示/隐藏
  track: undefined, // 绑定的音轨
  clone: undefined, // 克隆的数据
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -165px)',
  },
})

export default sourceEditorData

interface SourceEditorData {
  show: boolean
  track?: Track
  clone?: Source
  style: {
    zIndex: number
    transform: string
  }
}
