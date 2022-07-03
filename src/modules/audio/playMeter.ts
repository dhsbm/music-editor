import { indicatorData } from 'modules/indicator'
import { convertBeatTime } from 'modules/tools'
import { ConvertDir } from 'modules/tools/Interfacs'
import { audioContext, primaryGainControl, playData } from '.'

/**
 * @description: 播放节拍器
 * @return {void}
 */
const playMeter = () => {
  clearInterval(playData.meterTimer)
  if (!(playData.metronome && playData.playing)) return
  let i = Math.ceil(indicatorData.start)
  const delay = convertBeatTime(ConvertDir.BeatToTime, i - indicatorData.start)
  const timeout = convertBeatTime(ConvertDir.BeatToTime, 1)
  setTimeout(() => {
    if (i % 4 == 0) {
      playMeter1()
    } else {
      playMeter2()
    }
    i++
    playData.meterTimer = setInterval(() => {
      if (i % 4 == 0) {
        playMeter1()
      } else {
        playMeter2()
      }
      i++
    }, timeout * 1000)
  }, delay * 1000)
}

const playMeter1 = () => {
  // 播放节拍1
  const kickOscillator = audioContext.createOscillator()
  kickOscillator.frequency.setValueAtTime(200, 0)
  kickOscillator.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

  const kickGain = audioContext.createGain()
  kickGain.gain.setValueAtTime(10, 0)
  kickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)

  kickGain.connect(primaryGainControl)

  kickOscillator.connect(kickGain)
  kickOscillator.start()
  kickOscillator.stop(audioContext.currentTime + 0.1)
}

const buffer = audioContext.createBuffer(1, audioContext.sampleRate, audioContext.sampleRate)
const channelData = buffer.getChannelData(0)
for (let i = 0; i < buffer.length; i++) {
  channelData[i] = Math.random() * 2 - 1
}
// 滤波器
const snareFilter = audioContext.createBiquadFilter()
snareFilter.type = 'highpass'
snareFilter.frequency.value = 1500
snareFilter.connect(primaryGainControl)

const playMeter2 = () => {
  // 节拍2
  const whiteNoiseSource = audioContext.createBufferSource()
  whiteNoiseSource.buffer = buffer

  const whiteNoiseGain = audioContext.createGain()
  whiteNoiseGain.gain.setValueAtTime(1, audioContext.currentTime)
  whiteNoiseGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)

  whiteNoiseSource.connect(whiteNoiseGain)
  whiteNoiseGain.connect(snareFilter)
  whiteNoiseSource.start()
  whiteNoiseSource.stop(audioContext.currentTime + 0.1)
}

export default playMeter
