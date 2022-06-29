import { showCenterPrompt } from 'modules/prompt'
import { publishProjectWindowData } from '.'

/**
 * @description: 添加文章标签
 * @param {KeyboardEvent} e
 * @return {void}
 */
const inputProjectTag = (e: KeyboardEvent) => {
  if (e.key != 'Enter') return
  const { tagList, tag } = publishProjectWindowData
  if (tag.length > 5) {
    showCenterPrompt('标签过长')
  } else if (tagList.length < 3) {
    tagList.push(tag.trim())
    publishProjectWindowData.tag = ''
  } else {
    showCenterPrompt('最多添加3个标签')
  }
}
export default inputProjectTag
