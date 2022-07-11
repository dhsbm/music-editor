import { watch, reactive } from 'vue'
import { changeZIndex } from 'modules/tools'

// 导出全局历史事件列表以及列表指针
const historyData = reactive({
  show: true,
  index: -1, // 当前索引
  lastIndex: -1, // 最高索引
  newStep: 0, // 新做的步数 为0说明没有增加新操作
  oldStep: 0, // 过去的步数 为0说明没有撤回旧操作
  style: {
    zIndex: 0,
    transform: 'translate(0px, 0px)',
  },
  historyContainer: <HTMLElement>(<unknown>null),
})

// 每次显示时，呈现到页面最前方
watch(
  () => historyData.show,
  (now) => now && changeZIndex(historyData.style)
)

export default historyData
