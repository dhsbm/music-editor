import { reactive, watch } from 'vue'
import { changeZIndex } from 'modules/tools'

const feedbackData = reactive({
  show: false,
  style: {
    zIndex: 4,
    transform: 'translate(-190px, -160px)',
  },
})

watch(
  () => feedbackData.show,
  (now) => {
    now && changeZIndex(feedbackData.style)
  }
)

export default feedbackData
