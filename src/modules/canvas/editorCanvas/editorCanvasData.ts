import { reactive, computed, watch } from 'vue'
import { contentEditorData } from 'modules/pattern'
import { editorCanvasRender } from '..'
import { CanvasData } from '../Interface'

// 编辑器canvas数据
const editorCanvasData: CanvasData = reactive({
  canvas: <HTMLCanvasElement>(<unknown>undefined), // 画布
  ctx: <CanvasRenderingContext2D>(<unknown>undefined), // 画布2d上下文
  mobile: false, // 画布是否可移动
  beatWidth: 96, // 1大拍宽度
  maxBeatWidth: 768, // 最大节拍宽度
  minBeatWidth: 48, // 最小节拍宽度
  beatHeight: 16, // 节拍高度
  maxBeatHeight: 32, // 最大节拍高度
  minBeatHeight: 12, // 最小节拍高度
  totalBeats: 100, // 总拍数
  coverRadioY: 0.5, // 上方覆盖比例
  // 编辑区展示的高度 顶部标题30+顶部画布30+底部滚动条14
  editAreaHeight: computed(() => {
    editorCanvasRender()
    return parseInt(contentEditorData.style.height) - 74
  }),
  // 编辑区展示的宽度 左侧选项栏120+钢琴键盘60+画布左偏移10+右侧滚动条14
  editAreaWidth: computed(() => parseInt(contentEditorData.style.width) - 204),
  leftBeat: 0, // 左边的节拍数
  // 最右边的节拍数
  rightBeat: computed(() => editorCanvasData.leftBeat + editorCanvasData.editAreaWidth / editorCanvasData.beatWidth),
  // 总高度
  totalHeight: computed(() => editorCanvasData.beatHeight * 132),
  // 总高度与显示宽度的差
  difHeight: computed(() => editorCanvasData.totalHeight - editorCanvasData.editAreaHeight),
  // 垂直方向上覆盖的px
  coverPixelY: computed(() => editorCanvasData.coverRadioY * editorCanvasData.difHeight),
  // 指针样式
  style: {
    cursor: 'default',
  },

  // 裁剪线
  cutLineStyle: {
    transform: 'translateX(0px)',
  },
  // 选择框样式
  selectBoxStyle: {
    outlineWidth: '1px',
    top: '0',
    left: '0',
    width: '0',
    height: '0',
  },
  // 编辑器垂直移动滚动条样式
  scrollbarStyle: {
    width: computed(() => parseInt(contentEditorData.style.height) - 181 + 'px'),
  },
})

watch(
  () => [
    editorCanvasData.leftBeat,
    editorCanvasData.coverRadioY,
    editorCanvasData.beatHeight,
    editorCanvasData.beatWidth,
  ],
  () => editorCanvasRender()
)

export default editorCanvasData
