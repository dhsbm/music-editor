import { reactive, computed, watch } from 'vue'
import { changeZIndex } from 'modules/tools'

// 键盘响应式数据
const keyboardData: KeyboardData = reactive({
  show: false,
  coverRatio: 0.35,
  octave: 3,
  zoom: 1,
  showWidth: 860,
  totalWidth: computed(() => 2750 * keyboardData.zoom),
  style: {
    zIndex: 0,
    width: '1000px',
    height: '242px',
    minWidth: '600px',
    minHeight: '180px',
    transform: 'translate(-500px, -121px)',
  },
  canvasStyle: computed(
    () =>
      'margin-left:' +
      keyboardData.coverRatio * (keyboardData.showWidth - keyboardData.totalWidth) +
      'px;width:' +
      keyboardData.totalWidth +
      'px;'
  ),
})

watch(
  () => keyboardData.show,
  (now) => now && changeZIndex(keyboardData.style)
)

export default keyboardData

interface KeyboardData {
  show: boolean
  coverRatio: number
  octave: number
  zoom: number
  showWidth: number
  totalWidth: number
  style: {
    zIndex: number
    width: string
    height: string
    minWidth: string
    minHeight: string
    transform: string
  }
  canvasStyle: string
}
