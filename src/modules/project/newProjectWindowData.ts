import { reactive, watch } from 'vue'
import { changeZIndex } from 'modules/tools'

const newProjectWindowData = reactive({
  show: false,
  style: {
    zIndex: 4,
    transform: 'translate(-150px, -87px)',
  },
})

watch(
  () => newProjectWindowData.show,
  (now) => {
    now && changeZIndex(newProjectWindowData.style)
  }
)

export default newProjectWindowData
