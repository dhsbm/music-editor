import { reactive, computed, watch } from 'vue'
import { workerCanvasRender } from 'modules/canvas'
import { Track } from '@/class'

// 音轨数据
const trackData: TrackData = reactive({
  trackMap: <Map<number, Track>>new Map(), // 总音轨列表
  colorList: ['#F5606E', '#FA9C61', '#FFC254', '#F8E71D', '#89EB28', '#2283F6', '#DF71F6', '#A37AF5', '#16BDDE'],
  selectedTrack: undefined,
  trackOrder: <number[]>[], // 音轨根据id排序
  trackCount: computed(() => trackData.trackOrder.length),
  // 音轨数据数组
  sortedTrackData: computed(() => {
    const res = <Track[]>[]
    for (const trackId of trackData.trackOrder) {
      res.push(<Track>trackData.trackMap.get(trackId))
    }
    return res
  }),
})

watch(
  () => trackData.trackOrder,
  () => {
    workerCanvasRender()
  }
)

export default trackData

interface TrackData {
  trackMap: Map<number, Track>
  colorList: string[]
  selectedTrack?: Track
  trackOrder: number[]
  trackCount: number
  sortedTrackData: Track[]
}
