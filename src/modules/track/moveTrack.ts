import { hideHit, showHit } from 'modules/hit'
import { workerCanvasData } from 'modules/canvas'
import { recordHistory } from 'modules/history'
import { HistoryType } from 'modules/history/Interface'
import { trackData } from '.'

/**
 * @description: 点击音轨标题
 * @param {MouseEvent} e 鼠标事件对象
 * @param {number} trackId 点击音轨的trackId
 * @return {void}
 */
const moveTrack = (e: MouseEvent, trackId: number) => {
  showHit('ns-resize')
  let preRow = 0 // 上一次移动前的行数
  const oldOrder = [...trackData.trackOrder],
    { beatHeight } = workerCanvasData,
    oldRow = oldOrder.indexOf(trackId),
    restRow = oldOrder.length - oldRow - 1,
    oldPageY = e.pageY
  const move = (event: MouseEvent) => {
    const difRow = Math.round((event.pageY - oldPageY) / beatHeight)
    if (oldRow + difRow < 0 || restRow - difRow < 0) return
    if (difRow != preRow) {
      preRow = difRow
      const arr1 = oldOrder.slice(0, oldRow)
      const arr2 = oldOrder.slice(oldRow + 1)
      if (difRow == 0) {
        trackData.trackOrder = [...arr1, trackId, ...arr2]
      } else if (difRow < 0) {
        arr1.splice(difRow + oldRow, 0, trackId)
        trackData.trackOrder = [...arr1, ...arr2]
      } else {
        arr2.splice(difRow, 0, trackId)
        trackData.trackOrder = [...arr1, ...arr2]
      }
    }
  }
  const moveEnd = () => {
    hideHit()
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
    for (let i = 0; i < oldOrder.length; i++) {
      if (trackData.trackOrder[i] != oldOrder[i]) {
        recordHistory({
          type: HistoryType.Track,
          describe: '移动音轨',
          oldOrder,
          newOrder: [...trackData.trackOrder],
        })
        break
      }
    }
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}

export default moveTrack
