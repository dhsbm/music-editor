import { reactive } from 'vue'

const savePromptData: { show: boolean; fun?: () => void } = reactive({
  show: false,
  fun: undefined,
})

export default savePromptData
