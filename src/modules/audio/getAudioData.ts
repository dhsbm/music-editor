import { AudioData, NoteData, EnvelopeDate, DotData } from './Interface'
import { Track, Envelope, Pattern } from '@/class'
import { getLineY } from 'modules/dot'
import { trackData } from 'modules/track'
import { Shape } from '@/class/Interface'
import { beatToTime } from 'modules/tools'

let audioData: AudioData

/**
 * @description: 获取用于播放的音频数据
 * @param {boolean} sign 用于记录与清除音频数据，避免每次都重复获取
 * @return {AudioData}
 */
const getAudioData = (sign: boolean) => {
  if (!sign) {
    audioData = <AudioData>(<any>undefined)
    return audioData
  } else if (audioData != undefined) {
    return audioData
  }
  // 提取数据  开始播放
  const { sortedTrackData } = trackData
  const trackMap = <Map<number, Track>>new Map()
  const result = []
  for (const track of sortedTrackData) {
    // 独奏的
    if (track.solo) {
      trackMap.clear()
      trackMap.set(track.trackId, track)
      break
    }
    // 未静音的音轨才添加进去
    if (!track.mute) {
      trackMap.set(track.trackId, track)
    }
  }
  for (const [, track] of trackMap) {
    result.push(getTrackData(track, trackMap))
  }

  audioData = result
  return result
}
export default getAudioData

// 获取一个音轨的播放数据 包括其音源、音节、作用于它的包络
const getTrackData = (track: Track, trackMap: Map<number, Track>) => {
  // 处理音节
  const noteMap = <Map<number, Set<NoteData>>>new Map()
  const trackVolume = track.volume
  for (const patternId of track.patternIdSet) {
    const pattern = Pattern.getPattern(patternId)
    const { start, end, offsetX } = pattern
    const patternVolume = trackVolume * pattern.volume
    for (const [row, noteSet] of pattern.noteMap) {
      // 调用映射
      for (const note of noteSet) {
        if (note.start + offsetX > end || note.end + offsetX < start) continue
        const noteData = {
          start: Math.max(note.start + offsetX, start),
          end: Math.min(note.end + offsetX, end),
          volume: note.volume * patternVolume,
        }

        let notes = noteMap.get(row)
        if (!notes) {
          const set = <Set<NoteData>>new Set()
          noteMap.set(row, set)
          notes = set
        }
        notes.add(noteData)
      }
    }
  }
  // 处理包络
  const envelopeSet = <Set<EnvelopeDate>>new Set()
  for (const envelopeId of track.envelopeIdList) {
    const envelope = Envelope.getEnvelope(envelopeId)
    // 包络所在的音轨被静音了
    if (!trackMap.has(envelope.trackId)) continue

    const { start, end, offsetX, category, shape } = envelope
    let dotList = []
    let preDotData
    dotList.push({
      x: start,
      y: getLineY(envelope, start - offsetX),
    })
    for (const dot of envelope.dotList) {
      const dotData = {
        x: dot.x + offsetX,
        y: dot.y,
      }
      if (dot.x + offsetX < start) {
        preDotData = dotData
        continue
      }
      if (dot.x + offsetX > end) {
        if (shape == Shape.Sine) {
          pushSinDot(preDotData, dotData, dotList)
        }
        break
      }

      if (shape == Shape.Sine) {
        // 正弦，切分100点
        pushSinDot(preDotData, dotData, dotList)
        preDotData = dotData
      } else {
        // 折线/水平线
        dotList.push(dotData)
      }
    }
    // 正弦模式下会点会溢出范围，过滤一下
    if (shape == Shape.Sine) dotList = dotList.filter((dot) => dot.x >= start && dot.x <= end)
    dotList.push({
      x: end,
      y: getLineY(envelope, end - offsetX),
    })
    envelopeSet.add({ start, end, category, shape, dotList })
  }

  return {
    trackId: track.trackId,
    source: track.source,
    noteMap,
    envelopeSet,
  }
}

// 负责切片100份,需要传入前一点，当前点，存储列表，范围
const pushSinDot = (preDot: DotData | undefined, dot: DotData, dotList: DotData[]) => {
  if (!preDot) return
  const difX = dot.x - preDot.x
  const difY = dot.y - preDot.y
  const parts = beatToTime(difX) * 100

  for (let i = 0; i <= parts; i++) {
    const dy = (1 - Math.cos((i / parts) * Math.PI)) / 2
    const dx = i / parts
    dotList.push({
      x: preDot.x + dx * difX,
      y: preDot.y + dy * difY,
    })
  }
}
