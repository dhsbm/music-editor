import { Dot } from '@/class'
import { reactive } from 'vue'

const dotEditorData: DotEditorData = reactive({
  show: false,
  dot: undefined, // 编辑器绑定音节
  clone: undefined, // 克隆的数据
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

export default dotEditorData

interface DotEditorData {
  show: boolean
  dot?: Dot
  clone?: {
    y: number
  }
  style: {
    zIndex: number
    transform: string
  }
}
