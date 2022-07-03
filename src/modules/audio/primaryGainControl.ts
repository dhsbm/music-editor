import { audioContext } from '.'

// 声量控制器 所有音谱连接这个节点
const primaryGainControl = audioContext.createGain()
primaryGainControl.gain.value = 1
primaryGainControl.connect(audioContext.destination)

export default primaryGainControl
