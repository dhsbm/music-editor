import { reactive, watch } from 'vue'
import { globalData } from 'modules/globalData'
import { showCenterPrompt } from 'modules/prompt'
import { changeZIndex } from 'modules/tools'
import { showLoginWindow } from 'modules/user'
import { getBarOrTime } from '.'

const publishProjectWindowData = reactive({
  show: false,
  song: '',
  title: '',
  article: '',
  projectId: -1,
  projectTime: '',
  tag: '',
  tagList: <string[]>[],
  style: {
    zIndex: 4,
    transform: 'translate(-250px, -190px)',
  },
})

watch(
  () => publishProjectWindowData.show,
  async (now) => {
    if (!now) return
    if (!globalData.login) {
      showLoginWindow()
      showCenterPrompt('请先登录')
      publishProjectWindowData.show = false
      return
    } else {
      changeZIndex(publishProjectWindowData.style)
      publishProjectWindowData.projectId = globalData.project.projectId
      publishProjectWindowData.projectTime = getBarOrTime('time')
    }
  }
)

export default publishProjectWindowData
