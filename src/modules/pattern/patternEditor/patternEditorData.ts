import { Pattern } from '@/class'
import { reactive } from 'vue'

const patternEditorData: PatternEditorData = reactive({
  show: false,
  pattern: undefined, // 编辑器绑定音谱
  clone: undefined, // 克隆的数据
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

export default patternEditorData

interface PatternEditorData {
  show: boolean
  pattern?: Pattern
  clone?: {
    volume: number
  }
  style: {
    zIndex: number
    transform: string
  }
}
