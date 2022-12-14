import { redo, undo } from 'modules/history'

/**
 * @description: 为页面绑定监听器
 * @return {void}
 */
const addListener = () => {
  // 禁止页面缩放
  const banScroll = (e: Event) => {
    if ((<WheelEvent>e).ctrlKey) e.preventDefault()
  }
  //firefox
  document.addEventListener('DOMMouseScroll', banScroll, false)
  //ie 谷歌
  document.body.addEventListener('mousewheel', banScroll, {
    passive: false,
  })
  // 禁止默认的拖拽行为
  document.ondragover = (e) => {
    e.preventDefault() //只有在ondragover中阻止默认行为才能触发 ondrop 而不是 ondragleave
  }
  document.ondrop = (e) => {
    e.preventDefault() //阻止 document.ondrop的默认行为  在新窗口中打开拖进的图片
  }

  // 撤销重做快捷键
  document.addEventListener('keydown', (e) => {
    if (!e.ctrlKey) return
    const key = e.key.toLocaleLowerCase()
    if (key == 'z') undo()
    else if (key == 'y') redo()
  })
}

export default addListener
