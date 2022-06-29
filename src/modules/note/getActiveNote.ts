import { selectedNoteList } from '.'

/**
 * @description: 获取激活的音节（最后添加进选择区的音节）
 * @return {Note} 当前激活的音节
 */
const getActiveNote = () => {
  const list = [...selectedNoteList]
  return list[list.length - 1]
}

export default getActiveNote
