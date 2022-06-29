import { Dot } from '@/class'
import { drawDotData, selectedDotList } from '.'
/**
 * @description: 添加点到选择区
 * @param {Dot} [dot] 添加的点默认为null不添加
 * @param {boolean} [clear] 是否需要在添加前清空选择区，默认清空
 * @return {void}
 */
const selectDot = (dot: Dot | undefined = undefined, clear = true) => {
  if (clear) {
    let dot
    for (dot of selectedDotList) {
      selectedDotList.delete(dot)
    }
    dot && drawDotData(dot.dotData)
  }
  if (dot) {
    selectedDotList.delete(dot)
    selectedDotList.add(dot)
    drawDotData(dot.dotData)
  }
}

export default selectDot
