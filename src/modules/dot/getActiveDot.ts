import { selectedDotList } from '.'

/**
 * @description: 获取激活的音谱（最后添加进选择区的音谱）
 * @return {Dot} 当前激活的音谱
 */
const getActiveDot = () => {
  const list = [...selectedDotList]
  return list[list.length - 1]
}

export default getActiveDot
