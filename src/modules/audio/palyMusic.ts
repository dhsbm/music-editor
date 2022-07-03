import { indicatorData } from 'modules/indicator'
import { convertBeatTime } from 'modules/tools'
import { ConvertDir } from 'modules/tools/Interfacs'
import { getAudioData, playData, indexToFrequency, playNote } from '.'

let audioNodeArray: AudioScheduledSourceNode[] = []

const palyMusic = () => {
  for (const audioNode of audioNodeArray) {
    audioNode.stop()
  }
  audioNodeArray = []
  if (!playData.playing) {
    getAudioData(false)
    return
  }

  const audioData = getAudioData(true)

  // 提取每一条音轨的音频数据
  for (const trackData of audioData) {
    const { source, noteMap } = trackData
    for (const [index, noteSet] of noteMap) {
      const frequency = indexToFrequency(index)
      for (const note of noteSet) {
        const { start, end, volume } = note
        const musicStart = convertBeatTime(ConvertDir.BeatToTime, start - indicatorData.start)
        const duration = convertBeatTime(ConvertDir.BeatToTime, end - start)
        const oscillatorNode = playNote(frequency, volume, musicStart, duration, source)

        audioNodeArray.push(oscillatorNode)
      }
    }
  }
}

export default palyMusic
