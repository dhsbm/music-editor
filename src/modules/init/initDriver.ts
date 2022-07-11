import Driver from 'driver.js'
import { driverOptions } from 'modules/driver'
import { globalData } from 'modules/globalData'
import 'driver.js/dist/driver.min.css'

const initDriver = () => {
  globalData.driver = new Driver(driverOptions)
}

export default initDriver
