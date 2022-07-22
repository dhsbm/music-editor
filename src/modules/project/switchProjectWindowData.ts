import { reactive, watch } from 'vue'
import { globalData } from 'modules/globalData'
import { showCenterPrompt } from 'modules/prompt'
import { changeZIndex } from 'modules/tools'
import { showLoginWindow } from 'modules/user'
import { reqProjectList } from '@/api'

const switchProjectWindowData = reactive({
  show: false,
  select: -1, // 项目的id
  projectList: <{ projectId: number; title: string }[]>[],
  style: {
    zIndex: 4,
    transform: 'translate(-250px, -140px)',
  },
})

watch(
  () => switchProjectWindowData.show,
  async (now) => {
    if (!now) return
    if (!globalData.login) {
      showLoginWindow()
      showCenterPrompt('请先登录')
      switchProjectWindowData.show = false
      return
    } else {
      changeZIndex(switchProjectWindowData.style)
      switchProjectWindowData.projectList = (await reqProjectList()).data
    }
  }
)

export default switchProjectWindowData
