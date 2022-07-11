import { globalData } from 'modules/globalData'
import { steps } from '.'

/**
 * @description: 开始新手教程
 * @return {void}
 */
const guide = () => {
  const { driver } = globalData
  driver.defineSteps(steps)
  driver.start()
}

export default guide
