import { reactive } from 'vue'

const centerPromptData = reactive({
  content: '',
  style: {
    opacity: 0,
    pointerEvents: 'none',
  },
  timer: -1,
})

export default centerPromptData
