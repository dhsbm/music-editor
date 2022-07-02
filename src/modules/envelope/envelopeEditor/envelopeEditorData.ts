import { reactive } from 'vue'
import { Envelope } from '@/class'
const envelopeEditorData: EnvelopeEditorData = reactive({
  show: false, // 显示/隐藏
  envelope: undefined, // 绑定的包络
  clone: undefined, // 绑定的音轨
  large: false, // 是否处于最大化状态
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

export default envelopeEditorData

interface EnvelopeEditorData {
  show: boolean
  envelope?: Envelope
  clone?: {
    type: number
    category: number
    actTrackId: number
    envelopeTitle: string
  }
  large: boolean
  style: {
    zIndex: number
    transform: string
  }
}
