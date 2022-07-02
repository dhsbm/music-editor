import { selectedNoteList } from '.'

/**
 * @description: 获取激活的乐谱（最后添加进选择区的乐谱）
 * @return {Note} 当前激活的乐谱
 */
const getActiveNote = () => {
  const list = [...selectedNoteList]
  return list[list.length - 1]
}

export default getActiveNote
