import { Track, Envelope, Pattern } from '@/class'
import { workerCanvasData, editorCanvasData } from 'modules/canvas'
import { getLineY } from 'modules/dot'
import { indicatorData } from 'modules/indicator'
import { overlayData } from 'modules/overlay'
import { trackData } from 'modules/track'
import { bpm, timeData } from '.'

let oldStart: number
let timer: number
let oldWorkerLeftBeat: number, oldEditorLeftBeat: number
/**
 * @description: 播放/暂停
 * @return {void}
 */
const play = () => {
  if (timeData.playing) {
    timeData.playing = false
    indicatorData.start = oldStart
    workerCanvasData.leftBeat = oldWorkerLeftBeat
    editorCanvasData.leftBeat = oldEditorLeftBeat
    clearInterval(timer)

    // 停止播放
  } else {
    timeData.playing = true
    oldStart = indicatorData.start
    oldWorkerLeftBeat = workerCanvasData.leftBeat
    oldEditorLeftBeat = editorCanvasData.leftBeat
    const step = bpm.value / 60 / 50
    timer = setInterval(() => {
      if (timeData.cycle && indicatorData.start >= overlayData.end) {
        indicatorData.start = overlayData.start
        workerCanvasData.leftBeat = oldWorkerLeftBeat
        editorCanvasData.leftBeat = oldEditorLeftBeat
      }
      if (indicatorData.start >= workerCanvasData.rightBeat) {
        workerCanvasData.leftBeat = indicatorData.start
      }
      if (indicatorData.start >= editorCanvasData.rightBeat) {
        editorCanvasData.leftBeat = indicatorData.start
      }
      indicatorData.start += step
    }, 20)

    // 提取数据  开始播放
    const { sortedTrackData } = trackData
    const trackMap = new Map()
    const result = []
    for (const track of sortedTrackData) {
      // 独奏的
      if (track.solo) {
        trackMap.clear()
        trackMap.set(track.trackId, track)
        break
      }
      if (!track.mute) {
        trackMap.set(track.trackId, track)
      }
    }
    for (const [, track] of trackMap) {
      result.push(getTrackData(track, trackMap))
    }

    console.log(result)
  }
}

// 获取一个音轨的播放数据，返回一个对象
const getTrackData = (track: Track, trackMap: Map<number, Track>) => {
  // 处理音节
  const noteMap = <Map<number, Set<Note>>>new Map()
  for (const patternId of track.patternIdSet) {
    const pattern = Pattern.getPattern(patternId)
    const { start, end, offsetX } = pattern
    for (const [row, noteSet] of pattern.noteMap) {
      // 调用映射
      for (const note of noteSet) {
        if (note.start + offsetX > end || note.end + offsetX < start) continue
        const noteData = {
          start: Math.max(note.start + offsetX, start),
          end: Math.min(note.end + offsetX, end),
        }

        let notes = noteMap.get(row)
        if (!notes) {
          const set = <Set<Note>>new Set()
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

    const { start, end, offsetX, category, type } = envelope
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
        if (type == 4) {
          pushSinDot(preDotData, dotData, dotList)
        }
        break
      }

      if (type == 4) {
        // 正弦，切分100点
        pushSinDot(preDotData, dotData, dotList)
        preDotData = dotData
      } else {
        // 折线/水平线
        dotList.push(dotData)
      }
    }
    // 正弦模式下会点会溢出范围，过滤一下
    if (type == 4) dotList = dotList.filter((dot) => dot.x >= start && dot.x <= end)
    dotList.push({
      x: end,
      y: getLineY(envelope, end - offsetX),
    })
    envelopeSet.add({ start, end, category, type, dotList })
  }

  return {
    trackId: track.trackId,
    source: track.source,
    noteMap,
    envelopeSet,
  }
}

// 负责切片100份,需要传入前一点，当前点，存储列表，范围
const pushSinDot = (preDot: Dot | undefined, dot: Dot, dotList: Dot[]) => {
  if (!preDot) return
  const difX = dot.x - preDot.x
  const difY = dot.y - preDot.y
  for (let i = 0; i < 100; i++) {
    const dy = (1 - Math.cos((i / 100) * Math.PI)) / 2
    const dx = i / 100
    dotList.push({
      x: preDot.x + dx * difX,
      y: preDot.y + dy * difY,
    })
  }
}

export default play

interface EnvelopeDate {
  start: number
  end: number
  category: number
  type: number
  dotList: Dot[]
}

interface Note {
  start: number
  end: number
}

interface Dot {
  x: number
  y: number
}
