import { Source } from './Interface'
import { indexToFrequency, playNote, primaryGainControl } from 'modules/audio'

/**
 * @description: 播放默认音节音
 * @param {number} index 音节的索引
 * @return {void}
 */
const playDefaultNote = (index: number, source: Source = defaultSource) => {
  const frequency = indexToFrequency(index)
  const { time, noteOcillator, noteGain } = playNote(frequency, 1, 0, 0.1, source)
  noteOcillator.connect(noteGain)
  noteGain.connect(primaryGainControl)

  noteOcillator.start(time)
  noteOcillator.stop(time + 0.1)
}

const defaultSource: Source = {
  type: 'sine',
  attackTime: 0.2,
  decayTime: 0.3,
  releaseTime: 0.2,
  sustainLevel: 0.7,
}

export default playDefaultNote
