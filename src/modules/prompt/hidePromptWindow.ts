import { promptWindowData } from '.'

/**
 * @description: 关闭保存弹窗 根据传参选择是否保存
 * @param {number} sign
 * @return {null}
 */
const hidePromptWindow = (sign: 1 | 2 | 3) => {
  switch (sign) {
    case 1:
      promptWindowData.fun1!()
      break
    case 2:
      promptWindowData.fun2!()
      break
    case 3:
      break
  }

  promptWindowData.fun1 = promptWindowData.fun2 = undefined
  promptWindowData.show = false
}

export default hidePromptWindow
