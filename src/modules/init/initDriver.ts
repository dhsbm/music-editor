import Driver from 'driver.js'
import { driverOptions, guide } from 'modules/driver'
import { globalData } from 'modules/globalData'
import { showPromptWindow } from 'modules/prompt'

/**
 * @description: 初始化指导工具
 * @return {void}
 */
const initDriver = () => {
  globalData.driver = new Driver(driverOptions)
  const g = false
  if (g) {
    showPromptWindow({
      text: '是否要开始新手教程',
      fun1: guide,
      btn1: '开始教程',
    })
  }
}

export default initDriver
