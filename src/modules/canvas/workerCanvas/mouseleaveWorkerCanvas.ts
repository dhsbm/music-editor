import { changePrePointData } from '..'

/**
 * @description: 鼠标离开工作区画布，清空数据
 * @return {void}
 */
const mouseleaveWorkerCanvas = () => {
  changePrePointData('pattern', undefined)
  changePrePointData('envelope', undefined)
}

export default mouseleaveWorkerCanvas
