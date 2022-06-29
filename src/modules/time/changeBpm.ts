import { bpm } from '.'

/**
 * @description: 滚动修改bom
 * @param {WheelEvent} e 鼠标滚动事件对象
 * @return {void}
 */
const changeBpm = (e: WheelEvent) => {
  if (e.deltaY > 0 && bpm.value > 20) bpm.value--
  if (e.deltaY < 0 && bpm.value < 500) bpm.value++
}

export default changeBpm
