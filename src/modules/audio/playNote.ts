import { Source } from './Interface'
import { audioContext } from '.'
import { toNonNegative } from 'modules/tools'

/**
 * @description: 制作音节合成器与增益节点
 * @param {number} frequency 频率
 * @param {number} gain 响度
 * @param {number} duration 持续事件
 * @param {Source} Source 音源类型
 * @return {OscillatorNode}
 */
const playNote = (frequency: number, gain: number, start: number, duration: number, Source: Source) => {
  const noteOcillator = audioContext.createOscillator()
  noteOcillator.type = Source.type
  const time = audioContext.currentTime + start

  noteOcillator.frequency.setValueAtTime(frequency, 0)

  // 颤音
  // const vibrato = audioContext.createOscillator() // 颤音
  // vibrato.frequency.setValueAtTime(frequency / 20, 0)
  // const vibraGain = audioContext.createGain()
  // vibraGain.gain.setValueAtTime(gain * 1.5, 0)
  // vibrato.connect(vibraGain)
  // vibraGain.connect(noteOcillator.frequency)
  // vibrato.start(toNonNegative(time))

  const attackTime = duration * Source.attackTime // 上升
  const decayTime = duration * Source.decayTime // 衰退
  const releaseTime = duration * Source.releaseTime // 释放
  const sustainLevel = gain * Source.sustainLevel // 维持的高度

  const noteGain = audioContext.createGain()
  noteGain.gain.setValueAtTime(0, toNonNegative(time))
  noteGain.gain.linearRampToValueAtTime(gain, toNonNegative(time + attackTime))
  noteGain.gain.linearRampToValueAtTime(sustainLevel, toNonNegative(time + attackTime + decayTime))
  noteGain.gain.setValueAtTime(sustainLevel, toNonNegative(time + duration - releaseTime))
  noteGain.gain.linearRampToValueAtTime(0, toNonNegative(time + duration))

  return {
    time,
    noteOcillator,
    noteGain,
  }
}

export default playNote
