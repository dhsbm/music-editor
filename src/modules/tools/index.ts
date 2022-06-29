// 工具函数中间层

// 把num约成n位小数
import fix from './fix'
// 吸附函数，如果数字在可调整范围内，则调整为最接近的数
import adsorb from './adsorb'
// 将数字缩小为基数的最大整倍数
import toMultiple from './toMultiple'
// 获取数字小数点后的位数
import getPlaces from './getPlaces'
// 将数字控制在范围内
import toRange from './toRange'
// 节流函数
import throttle from './throttle'
// 防抖函数
import debounce from './debounce'
// 修改z-index把元素置于最上层
import changeZIndex from './changeZindex'
// 拖动元素
import moveDom from './moveDom'
// 修改元素的大小
import resizeDom from './resizeDom'
// 将基础数据转为JSON格式字符串
import stringify from './stringify'
// 初始化选择框数据  获取选择框数据
import { initSelectBox, getSelectBox } from './selectBox'
// 移动/伸缩 音谱/包络
import moveItem from './moveItem'
// 将小节转换为时间
import beatToTime from './beatToTime'
// 将小节转换为节拍
import beatToPat from './beatToPat'

export {
  fix,
  toMultiple,
  adsorb,
  getPlaces,
  toRange,
  throttle,
  debounce,
  changeZIndex,
  moveDom,
  resizeDom,
  stringify,
  initSelectBox,
  getSelectBox,
  moveItem,
  beatToTime,
  beatToPat,
}
