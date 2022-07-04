import { indicatorData } from 'modules/indicator'
import { beatToTime, toNonNegative } from 'modules/tools'
import { getAudioData, playData, indexToFrequency, playNote, playEnvelope, primaryGainControl } from '.'

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
    const { source, noteMap, envelopeSet } = trackData
    // 获取包络节点
    const { startNode, endNode } = playEnvelope(envelopeSet)
    for (const [index, noteSet] of noteMap) {
      const frequency = indexToFrequency(index)
      for (const note of noteSet) {
        const { start, end, volume } = note
        const musicStart = beatToTime(start - indicatorData.start)
        const duration = beatToTime(end - start)
        // 获取音频节点
        const { time, noteOcillator, noteGain } = playNote(frequency, volume, musicStart, duration, source)
        // 播放
        noteOcillator.connect(noteGain)
        noteGain.connect(startNode)
        endNode.connect(primaryGainControl)

        noteOcillator.start(toNonNegative(time))
        noteOcillator.stop(toNonNegative(time + duration))
        // 添加进节点列表中
        audioNodeArray.push(noteOcillator)
      }
    }
  }
}

export default palyMusic
