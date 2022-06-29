import { trackData } from 'modules/track'
import { stringify } from 'modules/tools'
import { Envelope, Pattern } from '.'
import { globalData } from 'modules/globalData'
import { TrackObj, IdMap } from './Interface'
// 音轨类
class Track {
  trackId: number // 音轨id,若为假值则自动创建并备案
  volume: number // 音轨响度
  source: number // 音源 (应该传入的时sourse类的id)
  color: string // 音轨颜色
  name: string // 音轨标题
  mute: boolean // 静音
  solo: boolean // 独奏
  patternIdSet: Set<number> // 音谱id集合
  envelopeIdSet: Set<number> // 所拥有的包络id
  envelopeIdList: Set<number> // 作用于此音轨的包络id
  constructor(trackId: number, volume = 50, source = 1) {
    this.trackId = trackId || globalData.project.newTrack(this)

    this.color = trackData.colorList[Math.floor(Math.random() * trackData.colorList.length)] // 颜色
    this.name = '音轨' + this.trackId // 名称
    this.volume = volume // 响度
    this.source = source // 音源
    this.mute = false // 静音
    this.solo = false // 独奏

    this.patternIdSet = new Set() // 音谱id集合
    this.envelopeIdSet = new Set() // 所拥有的包络id
    this.envelopeIdList = new Set() // 作用于此音轨的包络id
  }
  // 添加音谱
  addPattern(pattern: Pattern) {
    this.patternIdSet.add(pattern.patternId)
  }
  // 删除音谱
  deletePattern(pattern: Pattern) {
    this.patternIdSet.delete(pattern.patternId)
  }

  hasPattern(pattern: Pattern) {
    return this.patternIdSet.has(pattern?.patternId)
  }
  // 添加包络
  addEnvelope(envelope: Envelope) {
    this.envelopeIdSet.add(envelope.envelopeId)
  }
  // 删除包络
  deleteEnvelope(envelope: Envelope) {
    this.envelopeIdSet.delete(envelope.envelopeId)
  }

  hasEnvelope(envelope: Envelope) {
    return this.envelopeIdSet.has(envelope?.envelopeId)
  }
  // 添加作用于此音轨的包络
  actEnvelope(envelope: Envelope) {
    this.envelopeIdList.add(envelope.envelopeId)
  }
  // 解除作用于此音轨的包络
  removeEnvelope(envelope: Envelope) {
    this.envelopeIdList.delete(envelope.envelopeId)
  }

  static getTrack(trackId: number) {
    return globalData.project.getTrack(trackId)
  }

  static keys() {
    return ['color', 'name', 'volume', 'source']
  }
  // 编码为字符串
  static stringify(track: Track, idMap: IdMap) {
    const result = []
    result.push(`"trackId":${idMap.trackIdMap.get(track.trackId)}`)

    // 处理普通属性
    for (const key of <[]>Track.keys()) {
      result.push(`"${key}":${stringify(track[key])}`)
    }

    // 处理音谱集合  建立patternIdMap
    const patternIdSet = []
    for (const patternId of track.patternIdSet) {
      idMap.newPatternId++
      idMap.patternIdMap.set(patternId, idMap.newPatternId)
      patternIdSet.push(idMap.newPatternId)
    }
    result.push(`"patternIdSet":[${String(patternIdSet)}]`)

    // 处理包络集合  建立envelopeIdMap
    const envelopeIdSet = []
    for (const envelopeId of track.envelopeIdSet) {
      if (idMap.envelopeIdMap.has(envelopeId)) {
        envelopeIdSet.push(idMap.envelopeIdMap.get(envelopeId))
      } else {
        idMap.newEnvelopeId++
        idMap.envelopeIdMap.set(envelopeId, idMap.newEnvelopeId)
        envelopeIdSet.push(idMap.newEnvelopeId)
      }
    }
    result.push(`"envelopeIdSet":[${String(envelopeIdSet)}]`)

    // 处理作用于此音轨包络  建立envelopeIdMap
    const envelopeIdList = []
    for (const envelopeId of track.envelopeIdList) {
      if (idMap.envelopeIdMap.get(envelopeId)) {
        envelopeIdList.push(idMap.envelopeIdMap.get(envelopeId))
      } else {
        idMap.newEnvelopeId++
        idMap.envelopeIdMap.set(envelopeId, idMap.newEnvelopeId)
        envelopeIdList.push(idMap.newEnvelopeId)
      }
    }
    result.push(`"envelopeIdList":[${String(envelopeIdList)}]`)
    return '{' + String(result) + '}'
  }
  // 解码
  static parse(object: TrackObj, trackId: number) {
    const track = new Track(trackId)
    for (const key of <[]>Track.keys()) {
      track[key] = object[key]
    }

    // 建立音谱id集合
    const patternIdSet = <Set<number>>new Set()
    for (const patternId of object.patternIdSet) {
      patternIdSet.add(patternId)
    }
    track.patternIdSet = patternIdSet

    // 建立包络id集合
    const envelopeIdSet = <Set<number>>new Set()
    for (const envelopeId of object.envelopeIdSet) {
      envelopeIdSet.add(envelopeId)
    }
    track.envelopeIdSet = envelopeIdSet

    const envelopeIdList = <Set<number>>new Set()
    for (const envelopeId of object.envelopeIdList) {
      envelopeIdList.add(envelopeId)
    }
    track.envelopeIdList = envelopeIdList

    return track
  }
}

export default Track
