import { globalData } from 'modules/globalData'
import { steps } from '.'

/**
 * @description: 开始新手教程
 * @return {void}
 */
const guide = () => {
  document.body.style.overflow = 'hidden'
  const { driver } = globalData
  driver.defineSteps(steps)
  driver.start()
}

export default guide
