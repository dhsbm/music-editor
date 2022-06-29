import { computed, reactive } from 'vue'

// 弹窗的数据
const hoverPromptData: HoverPromptData = reactive({
  text: '', // 文本
  show: false, // 展示/隐藏
  arrowDirection: 'top',
  arrowStyle: computed(() => {
    if (hoverPromptData.arrowDirection == 'top') {
      return {
        top: '-4px',
        clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
      }
    } else if (hoverPromptData.arrowDirection == 'bottom') {
      return {
        bottom: '-4px',
        clipPath: 'polygon(0% 0%, 50% 100%, 0% 100%)',
      }
    }
    return {}
  }),
  style: {
    top: '0',
    left: '0',
  },
  debounced: null, // 防抖定时器
})

export default hoverPromptData

interface HoverPromptData {
  text: string
  show: boolean
  arrowDirection: string
  arrowStyle: {
    top?: string
    clipPath?: string
    bottom?: string
  }
  style: {
    top: string
    left: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounced: any
}
