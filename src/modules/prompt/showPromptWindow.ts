import { promptWindowData } from '.'

/**
 * @description:
 * @param {Option} option 参数对象
 * @return {void}
 */
const showPromptWindow = (option: Option) => {
  promptWindowData.show = true
  Object.assign(promptWindowData, option)
}

export default showPromptWindow

interface Option {
  text: string
  fun1: () => void
  fun2?: () => void
  btn1: string
  btn2?: string
  btn3?: string
}
