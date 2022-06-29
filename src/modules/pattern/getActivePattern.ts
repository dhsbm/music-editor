import { selectedPatternList } from '.'

/**
 * @description: 获取激活的音谱（最后添加进选择区的音谱）
 * @return {Pattern} 当前激活的音谱
 */
const getActivePattern = () => {
  const list = [...selectedPatternList]
  return list[list.length - 1]
}

export default getActivePattern
