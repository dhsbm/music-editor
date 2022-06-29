import { historyData } from '.'

/**
 * @description: 根据当前所处状态切换历史记录项的类名
 * @param {number} i 历史记录所在的索引
 * @return {string} 类名
 */
const historyItemClass = (i: number) => {
  if (i < historyData.index) return 'activated'
  else if (i > historyData.index) return 'will'
  else return 'active'
}

export default historyItemClass
