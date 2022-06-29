import { historyData } from '.'

/**
 * @description: 检查当前工程是否为最新的，是否需要保存
 * @return {boolean} 是否是最新的
 */
const isLatest = () => {
  // 判断标准，没有新操作，旧操作也没被更改
  return historyData.newStep == 0 && historyData.oldStep == 0
}

export default isLatest
