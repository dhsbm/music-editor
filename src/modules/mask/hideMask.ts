import { maskData } from '.'

/**
 * @description: 隐藏遮罩层
 * @return {void}
 */
const hideMask = () => {
  maskData.show = false
  maskData.fun = undefined
  maskData.style = ''
}

export default hideMask
