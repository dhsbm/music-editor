import { stringify, fix } from 'modules/tools'
import { globalData } from 'modules/globalData'
import { Note } from '.'
import { IdMap, PatternObj } from './Interface'

// 音谱类
class Pattern {
  patternId: number //音谱id,若为假值则自动创建并备案
  trackId: number // 所属的父声轨的id
  noteDataId: number // 绑定音节数据的id
  _start: number // 开始位置 私有
  _end: number // 结束位置 私有
  offsetX: number // pattern相对于noteData 的偏移位置
  volume: number // 响度
  patternTitle: string
  constructor(
    patternId: number,
    trackId: number,
    noteDataId: number,
    start: number,
    end: number,
    offsetX = start,
    volume = 50,
    patternTitle = '音谱'
  ) {
    this.patternId = patternId || globalData.project.newPattern(this)
    this.trackId = trackId // 所属的父声轨的id
    this.noteDataId = noteDataId // 绑定音节数据的id

    this._start = 0 // 开始位置 私有
    this._end = 0 // 结束位置 私有
    this.start = start // 开始位置
    this.end = end // 结束位置
    this.offsetX = offsetX // pattern相对于noteData 的位置
    this.volume = volume // 响度
    this.patternTitle = patternTitle
  }

  setNote(note: Note) {
    this.noteData.setNote(note)
  }

  deleteNote(note: Note) {
    this.noteData.deleteNote(note)
  }

  getNotes(row: number) {
    return this.noteData.getNotes(row)
  }

  hasNote(note: Note) {
    return this.noteData.hasNote(note)
  }

  addSelf() {
    this.track.addPattern(this)
    this.noteData.addPattern(this)
  }

  deleteSelf() {
    this.track.deletePattern(this)
    this.noteData.deletePattern(this)
  }

  clone(deep = false) {
    // 克隆当前音谱 是否深克隆
    const { trackId, noteDataId, start, end, offsetX, volume, patternTitle } = this
    const pattern = new Pattern(0, trackId, noteDataId, start, end, offsetX, volume, patternTitle)
    if (deep) {
      const noteData = this.noteData.clone()
      pattern.noteData = noteData
    }
    return pattern
  }

  // 根据id获取音谱
  static getPattern(patternId: number) {
    return globalData.project.getPattern(patternId)
  }

  // 编码为字符串
  static stringify(pattern: Pattern, idMap: IdMap) {
    const result = []

    // 建立noteDataIdMap
    if (!idMap.noteDataIdMap.has(pattern.noteDataId)) {
      idMap.newNoteDataId++
      idMap.noteDataIdMap.set(pattern.noteDataId, idMap.newNoteDataId)
    }

    // 从idMap中获取新的id
    const { trackId, patternId, noteDataId } = pattern
    result.push(`"trackId":${idMap.trackIdMap.get(trackId)}`)
    result.push(`"patternId":${idMap.patternIdMap.get(patternId)}`)
    result.push(`"noteDataId":${idMap.noteDataIdMap.get(noteDataId)}`)

    // 处理普通属性
    const { start, end, offsetX, volume, patternTitle } = pattern
    result.push(`"start":${stringify(start)}`)
    result.push(`"end":${stringify(end)}`)
    result.push(`"offsetX":${stringify(offsetX)}`)
    result.push(`"volume":${stringify(volume)}`)
    result.push(`"patternTitle":${stringify(patternTitle)}`)

    return '{' + String(result) + '}'
  }
  // 解码
  static parse(object: PatternObj, patternId: number) {
    const { trackId, noteDataId, start, end, offsetX, volume, patternTitle } = object
    const pattern = new Pattern(patternId, trackId, noteDataId, start, end, offsetX, volume, patternTitle)

    return pattern
  }

  set start(value) {
    this._start = fix(value, 6)
  }
  get start() {
    return this._start
  }

  set end(value) {
    this._end = fix(value, 6)
  }
  get end() {
    return this._end
  }

  get width() {
    return this._end - this._start
  }
  // 绑定的音节数据
  get noteData() {
    return globalData.project.getNoteData(this.noteDataId)
  }
  set noteData(noteData) {
    this.noteDataId = noteData.noteDataId
  }
  // 实际音节数据
  get noteMap() {
    return this.noteData.noteMap
  }
  // 所属的音轨
  get track() {
    return globalData.project.getTrack(this.trackId)
  }
  set track(track) {
    this.trackId = track.trackId
  }
}

export default Pattern
