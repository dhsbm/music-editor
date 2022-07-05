import { reactive, computed } from 'vue'
import { editorCanvasData } from '..'

// 内容编辑器键盘区数据
const editorPianoCanvasData = reactive({
  canvas: <HTMLCanvasElement>(<unknown>undefined),
  ctx: <CanvasRenderingContext2D>(<unknown>undefined),
  pressedKey: '', // 鼠标点击的键
  style: {
    marginTop: computed(() => -editorCanvasData.coverPixelY + 'px'),
    height: computed(() => editorCanvasData.totalHeight + 'px'),
    width: '60px',
  },
})

export default editorPianoCanvasData
