import { reactive } from 'vue'

const promptWindowData: PromptWindowData = reactive({
  show: false,
  text: '',
  fun1: undefined,
  fun2: undefined,
  btn1: '',
  btn2: '',
  btn3: '取消',
})

export default promptWindowData

interface PromptWindowData {
  show: boolean
  text: string
  fun1?: () => void
  fun2?: () => void
  btn1: string
  btn2: string
  btn3: string
}
