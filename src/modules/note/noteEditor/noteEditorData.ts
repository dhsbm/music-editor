import { Note } from '@/class'
import { reactive } from 'vue'

const noteEditorData: NoteEditorData = reactive({
  show: false,
  note: undefined, // 编辑器绑定音节
  clone: undefined, // 克隆的数据
  style: {
    zIndex: 4,
    transform: 'translate(-140px, -115px)',
  },
})

export default noteEditorData

interface NoteEditorData {
  show: boolean
  note?: Note
  clone?: {
    volume: number
  }
  style: {
    zIndex: number
    transform: string
  }
}
