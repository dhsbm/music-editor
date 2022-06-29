import { indicatorData } from '.'

/**
 * @description: 点击移动指针
 * @param {MouseEvent} e 鼠标按下事件对象
 * @param {number} beatWidth 当前1拍的长度
 * @param {number} leftBeat 左侧的排数
 * @return {void}
 */
const changeIndicator = (e: MouseEvent, beatWidth: number, leftBeat: number) => {
  indicatorData.start = e.offsetX / beatWidth + leftBeat
}

export default changeIndicator
