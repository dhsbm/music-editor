import { reactive } from 'vue'
import { Track } from '@/class'
const synthesizerData: SynthesizerData = reactive({
  show: false,
  track: undefined,
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

export default synthesizerData

interface SynthesizerData {
  show: boolean
  track?: Track
  style: {
    zIndex: number
    transform: string
  }
}
