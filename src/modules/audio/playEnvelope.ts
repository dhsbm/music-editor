import { Category, Shape } from '@/class/Interface'
import { indicatorData } from 'modules/indicator'
import { beatToTime, toNonNegative } from 'modules/tools'
import { audioContext } from '.'
import { EnvelopeDate } from './Interface'

/**
 * @description: 制作包络效果器
 * @param {Set} envelopeDateSet 包含包络数据的集合
 * @return {*}
 */
const playEnvelope = (envelopeDateSet: Set<EnvelopeDate>) => {
  const startNode: AudioNode = audioContext.createGain()
  let endNode = startNode

  for (const envelopeDate of envelopeDateSet) {
    const { start, end, category, shape, dotList } = envelopeDate
    const time = audioContext.currentTime + beatToTime(start - indicatorData.start)

    if (category == Category.Volume) {
      // 响度包络，制作增益节点
      const envelopeGain = audioContext.createGain()
      // setValueCurveAtTime(values, startTime, duration)
      if (shape == Shape.Broken || shape == Shape.Sine) {
        for (const dot of dotList) {
          const dotTime = beatToTime(dot.x - start)
          envelopeGain.gain.linearRampToValueAtTime(dot.y * 2, toNonNegative(time + dotTime))
        }
      } else if (shape == Shape.ForwardHr) {
        for (const dot of dotList) {
          const dotTime = beatToTime(dot.x - start)
          envelopeGain.gain.setValueAtTime(dot.y * 2, toNonNegative(time + dotTime))
        }
      } else if (shape == Shape.reverseHr) {
        for (let i = 0; i < dotList.length - 1; i++) {
          const dotTime = beatToTime(dotList[i].x - start)
          envelopeGain.gain.setValueAtTime(dotList[i + 1].y * 2, toNonNegative(time + dotTime))
        }
      }

      envelopeGain.gain.setValueAtTime(1, toNonNegative(time + beatToTime(end - start)))
      endNode.connect(envelopeGain)
      endNode = envelopeGain
    } else if (category == Category.Panner) {
      // 声像包络，制作声像节点
      const panner = new StereoPannerNode(audioContext)

      if (shape == Shape.Broken || shape == Shape.Sine) {
        for (const dot of dotList) {
          const dotTime = beatToTime(dot.x - start)
          panner.pan.linearRampToValueAtTime(1 - dot.y * 2, toNonNegative(time + dotTime))
        }
      } else if (shape == Shape.ForwardHr) {
        for (const dot of dotList) {
          const dotTime = beatToTime(dot.x - start)
          panner.pan.setValueAtTime(1 - dot.y * 2, toNonNegative(time + dotTime))
        }
      } else if (shape == Shape.reverseHr) {
        for (let i = 0; i < dotList.length - 1; i++) {
          const dotTime = beatToTime(dotList[i].x - start)
          panner.pan.setValueAtTime(1 - dotList[i + 1].y * 2, toNonNegative(time + dotTime))
        }
      }

      panner.pan.setValueAtTime(0, toNonNegative(time + beatToTime(end - start)))
      endNode.connect(panner)
      endNode = panner
    } else {
      throw Error()
    }
  }

  return { startNode, endNode }
}
export default playEnvelope
