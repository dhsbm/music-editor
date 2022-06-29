import { reactive, computed, watch } from 'vue'
import { trackData } from 'modules/track'
import { workerCanvasRender } from '..'
import { CanvasData } from '../Interface'
// 工作区的数据
const workerCanvasData: CanvasData = reactive({
  canvas: <HTMLCanvasElement>(<unknown>undefined), // 画布
  ctx: <CanvasRenderingContext2D>(<unknown>undefined), // 画布2d上下文
  mobile: false, // 是否可移动
  beatWidth: 96, // 1大拍宽度
  maxBeatWidth: 768, // 最大节拍宽度
  minBeatWidth: 48, // 最小节拍宽度
  beatHeight: 80, // 音轨高度
  maxBeatHeight: 160, // 最大节拍高度
  minBeatHeight: 30, // 最大节拍高度
  totalBeats: 100, // 总共100格
  coverRadioY: 0, // 上方覆盖的比例
  editAreaHeight: 0, // 编辑区展示的高度
  editAreaWidth: 0, // 编辑区展示的宽度
  leftBeat: 0, // 最左边的节拍
  // 最右边的节拍数
  rightBeat: computed(() => workerCanvasData.leftBeat + workerCanvasData.editAreaWidth / workerCanvasData.beatWidth),
  // 总高度 56 :添加按钮70 -底部滑块 14
  totalHeight: computed(() => 56 + trackData.trackCount * workerCanvasData.beatHeight),
  // 总高度与显示宽度的差
  difHeight: computed(() => workerCanvasData.totalHeight - workerCanvasData.editAreaHeight),
  // 垂直方向上覆盖的px
  coverPixelY: computed(() => workerCanvasData.coverRadioY * workerCanvasData.difHeight),
  // 侧边音轨样式
  containerTracksStyle: computed(() => 'margin-top:' + -workerCanvasData.coverPixelY + 'px'),

  // 指针样式
  style: {
    cursor: 'default',
  },
  // 裁剪线
  cutLineStyle: {
    transform: 'translateX(0px)',
  },
  // 选择框
  selectBoxStyle: {
    outlineWidth: '1px',
    top: '0',
    left: '0',
    width: '0',
    height: '0',
  },
  // 工作区垂直移动滚动条样式
  scrollbarStyle: {
    width: '0px',
  },
  // 工作区垂直移动滚动条 隐藏/显示
  scrollbarHide: computed(() => {
    if (workerCanvasData.totalHeight > workerCanvasData.editAreaHeight) {
      return false
    } else {
      workerCanvasData.coverRadioY = 0
      return true
    }
  }),
})

watch(
  () => [
    workerCanvasData.coverRadioY,
    workerCanvasData.leftBeat,
    workerCanvasData.beatWidth,
    workerCanvasData.beatHeight,
  ],
  () => workerCanvasRender()
)

export default workerCanvasData
