import { reactive } from 'vue'

const maskData: MaskData = reactive({
  show: false,
  fun: undefined,
  style: '',
})

export default maskData

interface MaskData {
  show: boolean
  fun?: () => void
  style: string
}
