import { reactive, computed } from 'vue'
import { indicatorData } from 'modules/indicator'
import { workerSig } from '.'
import { beatToPatStr, beatToTimeStr } from 'modules/tools'

// 时间部分的数据
const timeData = reactive({
  showPat: false, // 展示拍数/时间
  // 展示的时间
  displayTime: computed(() => {
    if (timeData.showPat) {
      const sig = Math.min(workerSig.value, 16)
      return beatToPatStr(indicatorData.start, sig)
    } else {
      return beatToTimeStr(indicatorData.start)
    }
  }),
})

export default timeData
