import { Dot } from '@/class'
import { changeZIndex } from 'modules/tools'
import { dotEditorData } from '..'
/**
 * @description: 打开音点编辑器
 * @param {Dot} dot 要绑定的音点
 * @return {void}
 */
const showDotEditor = (dot: Dot) => {
  dotEditorData.show = true
  dotEditorData.dot = dot
  dotEditorData.clone = {
    y: dot.y,
  }
  changeZIndex(dotEditorData.style)
}

export default showDotEditor
