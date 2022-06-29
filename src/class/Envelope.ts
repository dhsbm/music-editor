import { stringify, fix } from 'modules/tools'
import { globalData } from 'modules/globalData'
import { Dot } from '.'
import { IdMap, EnvelopeObj } from './Interface'

// 包络类
class Envelope {
  envelopeId: number // 包络id
  trackId: number // 所属的音轨id
  dotDataId: number // 绑定的节点数据id
  actTrackId: number // 作用于的音轨 0表示未绑定
  offsetX: number // 包络相对于音节数据的偏移位置
  private _start: number // 开始位置
  private _end: number // 结束位置
  constructor(envelopeId: number, trackId: number, dotDataId: number, start: number, end: number, offsetX = start) {
    this.envelopeId = envelopeId || globalData.project.newEnvelope(this) // 包络id
    this.trackId = trackId // 所属的父音轨
    this.dotDataId = dotDataId // 值为dot的数组
    this.actTrackId = 0 // 作用于的音轨 0表示未绑定

    this._start = 0 // 开始位置 私有
    this.start = start // 开始位置
    this._end = 0 // 结束位置 私有
    this.end = end // 结束位置
    this.offsetX = offsetX // envelope相对于dotData 的位置
  }

  // 添加节点
  addDot(dot: Dot) {
    this.dotData.addDot(dot)
  }
  // 删除节点
  deleteDot(dot: Dot) {
    this.dotData.deleteDot(dot)
  }

  hasDot(dot: Dot) {
    return this.dotData.hasDot(dot)
  }

  // 将自身添加进音轨与节点数据中
  addSelf() {
    this.track.addEnvelope(this)
    this.dotData.addEnvelope(this)
    this.actTrackId && this.actTrack.actEnvelope(this)
  }

  // 从音轨与节点数据删除自身
  deleteSelf(disconnect = true) {
    this.track.deleteEnvelope(this)
    this.dotData.deleteEnvelope(this)
    disconnect && this.actTrackId && this.actTrack.removeEnvelope(this)
  }

  // 克隆包络
  clone(deep = false) {
    // 克隆当前音谱 是否深克隆
    const envelope = new Envelope(0, this.trackId, this.dotDataId, this.start, this.end, this.offsetX)
    if (deep) {
      const dotData = this.dotData.clone()
      envelope.dotData = dotData
    }
    return envelope
  }

  // 根据id获取包络
  static getEnvelope(envelopeId: number) {
    return globalData.project.getEnvelope(envelopeId)
  }

  static keys() {
    return ['start', 'end', 'offsetX']
  }
  // 编码为字符串
  static stringify(envelope: Envelope, idMap: IdMap) {
    const result = []

    // 建立dotDataIdMap
    if (!idMap.dotDataIdMap.has(envelope.dotDataId)) {
      idMap.newDotDataId++
      idMap.dotDataIdMap.set(envelope.dotDataId, idMap.newDotDataId)
    }

    // 从idMap中获取新的id
    result.push(`"trackId":${idMap.trackIdMap.get(envelope.trackId)}`)
    result.push(`"envelopeId":${idMap.envelopeIdMap.get(envelope.envelopeId)}`)
    result.push(`"dotDataId":${idMap.dotDataIdMap.get(envelope.dotDataId)}`)
    result.push(`"actTrackId":${idMap.trackIdMap.get(envelope.actTrackId) || 0}`)

    // 处理普通属性
    for (const key of <[]>Envelope.keys()) {
      result.push(`"${key}":${stringify(envelope[key])}`)
    }

    return '{' + String(result) + '}'
  }
  // 解码
  static parse(object: EnvelopeObj, envelopeId: number) {
    const { trackId, dotDataId, start, end, offsetX } = object
    const envelope = new Envelope(envelopeId, trackId, dotDataId, start, end, offsetX)
    envelope.actTrackId = object.actTrackId

    return envelope
  }

  get start() {
    return this._start
  }
  set start(value) {
    this._start = fix(value, 6)
  }

  get end() {
    return this._end
  }
  set end(value) {
    this._end = fix(value, 6)
  }

  get width() {
    return this._end - this._start
  }
  // 所属音轨
  get track() {
    return globalData.project.getTrack(this.trackId)
  }
  set track(track) {
    this.trackId = track.trackId
  }
  // 生效音轨
  get actTrack() {
    return globalData.project.getTrack(this.actTrackId)
  }
  set actTrack(track) {
    this.actTrackId = track.trackId
  }
  // 绑定的节点数据
  get dotData() {
    return globalData.project.getDotData(this.dotDataId)
  }
  set dotData(dotData) {
    this.dotDataId = dotData.dotDataId
  }
  // 绑定的节点列表
  get dotList() {
    return this.dotData.dotList
  }
  // 节点数据的类型
  set type(type) {
    this.dotData.type = type
  }
  get type() {
    return this.dotData.type
  }
  // 节点数据的类别
  set category(category) {
    this.dotData.category = category
  }
  get category() {
    return this.dotData.category
  }
  // 默认值
  get defaultValue() {
    return this.dotData.defaultValue
  }
}

export default Envelope
