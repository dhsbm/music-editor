import { reactive, watch } from 'vue'
import { globalData } from 'modules/globalData'
import { changeZIndex } from 'modules/tools'
import { showCenterPrompt } from 'modules/prompt'
import { showLoginWindow } from 'modules/user'

const saveProjectWindowData = reactive({
  show: false, // 显示/隐藏
  title: '', // 项目名称
  introduce: '', // 项目描述
  style: {
    zIndex: 4,
    transform: 'translate(-150px, -120px)',
  },
})

watch(
  () => saveProjectWindowData.show,
  (now) => {
    if (!now) return
    if (!globalData.login) {
      showLoginWindow()
      showCenterPrompt('请先登录')
      saveProjectWindowData.show = false
      return
    }
    saveProjectWindowData.title = globalData.project.title
    saveProjectWindowData.introduce = globalData.project.introduce
    changeZIndex(saveProjectWindowData.style)
  }
)

export default saveProjectWindowData
