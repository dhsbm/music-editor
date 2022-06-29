import { reactive } from 'vue'

const envelopeMenuData = reactive({
  sign: true, // 控制点击后是否要隐藏弹窗
  show: false, // 菜单显示/隐藏
  style: {
    left: '0px',
    top: '0px',
    zIndex: 9999,
  },
})

export default envelopeMenuData
