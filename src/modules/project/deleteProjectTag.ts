import { publishProjectWindowData } from '.'

/**
 * @description: 删除文章标签
 * @param {number} index 要删除标签的索引
 * @return {void}
 */
const deleteProjectTag = (index: number) => {
  publishProjectWindowData.tagList.splice(index, 1)
}

export default deleteProjectTag
