import { hitData } from '.'

/**
 * @description: 关闭Hit(停止维持指针样式)
 * @return {void}
 */
const hideHit = () => {
  hitData.class = ''
  hitData.style.pointerEvents = 'none'
}

export default hideHit
