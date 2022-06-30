import { deletePattern, selectPattern, selectedPatternList, showPatternMenu, tailorPattern, findPointPattern } from '.'
import { adsorb, moveItem } from 'modules/tools'
import { mode } from 'modules/globalData'
import { workerCanvasData } from 'modules/canvas'
import { workerSig } from 'modules/time'
import { Pattern } from '@/class'
import { Mode } from 'modules/globalData/Interface'

/**
 * @description: 点击音谱的处理函数
 * @param {MouseEvent} e 鼠标事件对象
 * @param {object} data 包含音谱的相关数据
 * @return {void}
 */
const mousedownPattern = (e: MouseEvent, data: ReturnType<typeof findPointPattern>) => {
  const { changeStart, changeEnd } = data
  const pattern = <Pattern>data.pointPattern
  selectPattern(pattern, !selectedPatternList.has(pattern))
  if (e.button == 2) {
    // 打开菜单
    showPatternMenu(e)
    return
  }
  // 鼠标左键
  const { beatWidth, leftBeat } = workerCanvasData
  const sig = Math.floor((4 * 10 ** 6) / workerSig.value) / 10 ** 6
  if (mode.value == Mode.Delete) {
    // 删除模式：删除目标音谱
    deletePattern(pattern)
  } else if (mode.value == Mode.Tailor) {
    // 裁剪模式：创造新音谱，浅拷贝其中的内容
    const middle = adsorb(e.offsetX / beatWidth + leftBeat, sig, sig / 2)
    // 不满足裁剪条件，返回
    if (middle >= pattern.end || middle <= pattern.start) return
    tailorPattern(pattern, middle)
  } else {
    // 选择/添加模式：拖动或修改音谱
    moveItem(e, pattern, changeStart, changeEnd)
  }
}

export default mousedownPattern
