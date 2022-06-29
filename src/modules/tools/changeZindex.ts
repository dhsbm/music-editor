let baseZIndex = 5

/**
 * @description: 修改z-index把元素置于最上层
 * @param {object} style 要修改的样式对象
 * @return {void}
 */
const changeZIndex = (style: { zIndex: number }) => {
  // 取dom元素
  if (style.zIndex >= baseZIndex) return
  else style.zIndex = ++baseZIndex
}

export default changeZIndex
