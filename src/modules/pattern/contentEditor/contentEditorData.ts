import { reactive, computed, watch } from 'vue'
import { editorCanvasData, editorCanvasRender } from 'modules/canvas'
import { selectedNoteList } from 'modules/note'
import { changeZIndex } from 'modules/tools'
import { Pattern } from '@/class'

const contentEditorData: ContentEditorData = reactive({
  show: false, // 内容编辑器显示/隐藏
  pattern: undefined, // 绑定的音谱
  large: false, // 是否处于最大化状态
  style: {
    zIndex: 4,
    width: '900px',
    height: '600px',
    minWidth: '600px',
    minHeight: '200px',
    transform: 'translate(-450px, -300px)',
  },

  overlayStyle: computed(() => {
    const { pattern } = contentEditorData
    if (pattern) {
      return {
        width: pattern.width * editorCanvasData.beatWidth + 'px',
        transform: 'translateX(' + editorCanvasData.beatWidth * (pattern.start - editorCanvasData.leftBeat) + 'px)',
      }
    } else {
      return undefined
    }
  }),
  overlayHeaderStyle: computed(() => {
    if (contentEditorData.pattern) {
      return `background:${contentEditorData.pattern.track.color};`
    } else {
      return ''
    }
  }),
})

let preStyle = {
  width: '900px',
  height: '600px',
  transform: 'translate(-450px, -300px)',
}
watch(
  () => contentEditorData.large,
  (now) => {
    if (now) {
      preStyle = { ...contentEditorData.style }
      const { clientWidth, clientHeight } = document.body
      contentEditorData.style.width = clientWidth + 'px'
      contentEditorData.style.height = clientHeight - 50 + 'px'
      contentEditorData.style.transform = `translate(-${clientWidth / 2}px, -${clientHeight / 2 - 50}px)`
    } else {
      contentEditorData.style.width = preStyle.width
      contentEditorData.style.height = preStyle.height
      contentEditorData.style.transform = preStyle.transform
    }
    editorCanvasRender()
  }
)

watch(
  () => contentEditorData.pattern,
  () => {
    selectedNoteList.clear()
  }
)
watch(
  () => contentEditorData.show,
  (now) => now && changeZIndex(contentEditorData.style)
)

export default contentEditorData

interface ContentEditorData {
  show: boolean
  pattern?: Pattern
  large: boolean
  style: {
    zIndex: number
    width: string
    height: string
    minWidth: string
    minHeight: string
    transform: string
  }
  overlayStyle?: {
    width: string
    transform: string
  }
  overlayHeaderStyle: string
}
