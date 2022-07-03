import { reactive, watch } from 'vue'
import { playMeter } from '.'

const playData = reactive({
  playing: false, // 播放
  cycle: false, // 循环
  metronome: false, // 节拍器
  meterTimer: -1,
})

export default playData

watch(
  () => playData.metronome,
  () => {
    playMeter()
  }
)
