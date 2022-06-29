import { reactive, computed } from 'vue'
import { indicatorData } from 'modules/indicator'
import { bpm, workerSig } from '.'
import { beatToPat, beatToTime } from 'modules/tools'

// 时间部分的数据
const timeData = reactive({
  showPat: false, // 展示拍数/时间
  play: false, // 播放
  cycle: true, // 循环
  metronome: false, // 节拍器
  // 展示的时间
  displayTime: computed(() => {
    if (timeData.showPat) {
      const sig = Math.min(workerSig.value, 16)
      return beatToPat(indicatorData.start, sig)
    } else {
      return beatToTime(indicatorData.start, bpm.value)
    }
  }),
})

export default timeData
