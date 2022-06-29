import { savePromptData } from '.'

/**
 * @description:
 * @param {() => void} fun 记录的函数，根据选择是否要执行
 * @return {void}
 */
const showSavePrompt = (fun: () => void) => {
  savePromptData.show = true
  savePromptData.fun = fun
}

export default showSavePrompt
