import { stringify } from 'modules/tools'
import { trackData } from 'modules/track'
import { Envelope, DotData, NoteData, Pattern, Track } from '.'
import { ProjectObj } from './Interface'
// 项目类
class Project {
  projectId: number // 项目id
  title: string // 项目标题
  introduce: string // 项目介绍
  authorId: string // 项目作者
  // 所有数据
  trackMap: Map<number, Track>
  patternMap: Map<number, Pattern>
  noteDataMap: Map<number, NoteData>
  envelopeMap: Map<number, Envelope>
  dotDataMap: Map<number, DotData>
  // 用于自增id
  trackId: number
  patternId: number
  noteDataId: number
  envelopeId: number
  dotDataId: number
  constructor() {
    this.projectId = Math.floor(Math.random() * 10000)
    this.title = '默认项目'
    this.introduce = ''
    this.authorId = ''

    this.trackMap = new Map()
    this.patternMap = new Map()
    this.noteDataMap = new Map()
    this.envelopeMap = new Map()
    this.dotDataMap = new Map()

    this.trackId = 0
    this.patternId = 0
    this.noteDataId = 0
    this.envelopeId = 0
    this.dotDataId = 0
  }

  // 接受一个Track，给他分配id，下同
  newTrack(track: Track) {
    this.trackMap.set(++this.trackId, track)
    return this.trackId
  }
  newPattern(pattern: Pattern) {
    this.patternMap.set(++this.patternId, pattern)
    return this.patternId
  }
  newNoteData(noteData: NoteData) {
    this.noteDataMap.set(++this.noteDataId, noteData)
    return this.noteDataId
  }
  newEnvelope(envelope: Envelope) {
    this.envelopeMap.set(++this.envelopeId, envelope)
    return this.envelopeId
  }
  newDotData(dotData: DotData) {
    this.dotDataMap.set(++this.dotDataId, dotData)
    return this.dotDataId
  }
  // 根据id获取对象
  getTrack(trackId: number) {
    return <Track>this.trackMap.get(trackId)
  }
  getPattern(patternId: number) {
    return <Pattern>this.patternMap.get(patternId)
  }
  getNoteData(noteDataId: number) {
    return <NoteData>this.noteDataMap.get(noteDataId)
  }
  getEnvelope(envelopeId: number) {
    return <Envelope>this.envelopeMap.get(envelopeId)
  }
  getDotData(dotDataId: number) {
    return <DotData>this.dotDataMap.get(dotDataId)
  }

  static keys() {
    return ['id', 'title', 'introduce', 'authorId']
  }

  // 流程：Project -> trackOrder -> 建立trackIdMap -> Track ->
  // 建立patternIdSet-> Pattern -> 建立noteDataIdMap -> NoteDara -> Note
  // 建立envelopeIdSet-> Envelope -> 建立dotDataIdMap -> dotDara -> Dot
  // 编码为字符串
  static stringify(project: Project) {
    const result = []
    // 处理普通属性
    for (const key of <[]>Project.keys()) {
      result.push(`"${key}":${stringify(<string | number>project[key])}`)
    }

    const idMap = {
      newTrackId: 0,
      newPatternId: 0,
      newNoteDataId: 0,
      newEnvelopeId: 0,
      newDotDataId: 0,
      trackIdMap: new Map(),
      patternIdMap: new Map(),
      noteDataIdMap: new Map(),
      envelopeIdMap: new Map(),
      dotDataIdMap: new Map(),
    }

    // 建立trackIdMap 记录音轨映射
    const trackMap = []
    for (const trackId of trackData.trackOrder) {
      const track = project.getTrack(trackId)
      idMap.newTrackId++
      idMap.trackIdMap.set(trackId, idMap.newTrackId)
      trackMap.push(`"${idMap.newTrackId}":${Track.stringify(track, idMap)}`)
    }
    result.push(`"trackId":${idMap.newTrackId}`)
    result.push(`"trackMap":{${String(trackMap)}}`)

    // 记录音谱映射
    const patternMap = []
    for (const [oldPatternId, newPatternId] of idMap.patternIdMap) {
      const pattern = project.getPattern(oldPatternId)
      patternMap.push(`"${newPatternId}":${Pattern.stringify(pattern, idMap)}`)
    }
    result.push(`"patternId":${idMap.newPatternId}`)
    result.push(`"patternMap":{${String(patternMap)}}`)

    // 记录音节数据的映射
    const noteDataMap = []
    for (const [oldNoteDataId, newNoteDataId] of idMap.noteDataIdMap) {
      const noteData = project.getNoteData(oldNoteDataId)
      noteDataMap.push(`"${newNoteDataId}":${NoteData.stringify(noteData, idMap)}`)
    }
    result.push(`"noteDataId":${idMap.newNoteDataId}`)
    result.push(`"noteDataMap":{${String(noteDataMap)}}`)

    // 记录包络映射
    const envelopeMap = []
    for (const [oldEnvelopeId, newEnvelopeId] of idMap.envelopeIdMap) {
      const envelope = project.getEnvelope(oldEnvelopeId)
      envelopeMap.push(`"${newEnvelopeId}":${Envelope.stringify(envelope, idMap)}`)
    }
    result.push(`"envelopeId":${idMap.newEnvelopeId}`)
    result.push(`"envelopeMap":{${String(envelopeMap)}}`)

    // 记录包络节点数据的映射
    const dotDataMap = []
    for (const [oldDotDataId, newDotDataId] of idMap.dotDataIdMap) {
      const dotData = project.getDotData(oldDotDataId)
      dotDataMap.push(`"${newDotDataId}":${DotData.stringify(dotData, idMap)}`)
    }
    result.push(`"dotDataId":${idMap.newDotDataId}`)
    result.push(`"dotDataMap":{${String(dotDataMap)}}`)

    return '{' + String(result) + '}'
  }

  // 解析对象
  static parse(object: ProjectObj) {
    const project = new Project()
    for (const key of <[]>Project.keys()) {
      project[key] = object[key]
    }

    // 建立音轨映射
    const trackMap = new Map()
    for (const trackId of Object.keys(object.trackMap)) {
      const id = parseInt(trackId)
      trackMap.set(id, Track.parse(object.trackMap[trackId], id))
    }
    project.trackMap = trackMap
    project.trackId = object.trackId

    // 建立音谱映射
    const patternMap = new Map()
    for (const patternId of Object.keys(object.patternMap)) {
      const id = parseInt(patternId)
      patternMap.set(id, Pattern.parse(object.patternMap[patternId], id))
    }
    project.patternMap = patternMap
    project.patternId = object.patternId

    // 建立音节数据映射
    const noteDataMap = new Map()
    for (const noteDataId of Object.keys(object.noteDataMap)) {
      const id = parseInt(noteDataId)
      noteDataMap.set(id, NoteData.parse(object.noteDataMap[noteDataId], id))
    }
    project.noteDataMap = noteDataMap
    project.noteDataId = object.noteDataId

    // 建立包络映射
    const envelopeMap = new Map()
    for (const envelopeId of Object.keys(object.envelopeMap)) {
      const id = parseInt(envelopeId)
      envelopeMap.set(id, Envelope.parse(object.envelopeMap[envelopeId], id))
    }
    project.envelopeMap = envelopeMap
    project.envelopeId = object.envelopeId

    // 建立音节数据映射
    const dotDataMap = new Map()
    for (const dotDataId of Object.keys(object.dotDataMap)) {
      const id = parseInt(dotDataId)
      dotDataMap.set(id, DotData.parse(object.dotDataMap[dotDataId], id))
    }
    project.dotDataMap = dotDataMap
    project.dotDataId = object.dotDataId

    return project
  }
}

export default Project
