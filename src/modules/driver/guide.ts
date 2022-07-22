import { globalData } from 'modules/globalData'
import { showMask } from 'modules/mask'
import { steps } from '.'

/**
 * @description: 开始新手教程
 * @return {void}
 */
const guide = () => {
  document.body.style.overflow = 'hidden'
  showMask()
  const { driver } = globalData
  driver.defineSteps(steps)
  driver.start()
}

export default guide
