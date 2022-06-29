import { changePrePointData } from '..'

/**
 * @description: 鼠标离开编辑器画布，清空数据
 * @return {void}
 */
const mouseleaveEditorCanvas = () => {
  changePrePointData('note', undefined)
}

export default mouseleaveEditorCanvas
