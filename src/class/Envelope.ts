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
  envelopeTitle: string
  private _start: number // 开始位置
  private _end: number // 结束位置
  constructor(
    envelopeId: number,
    trackId: number,
    dotDataId: number,
    start: number,
    end: number,
    offsetX = start,
    envelopeTitle = '包络'
  ) {
    this.envelopeId = envelopeId || globalData.project.newEnvelope(this) // 包络id
    this.trackId = trackId // 所属的父音轨
    this.dotDataId = dotDataId // 值为dot的数组
    this.actTrackId = 0 // 作用于的音轨 0表示未绑定

    this._start = 0 // 开始位置 私有
    this.start = start // 开始位置
    this._end = 0 // 结束位置 私有
    this.end = end // 结束位置
    this.offsetX = offsetX // envelope相对于dotData 的位置
    this.envelopeTitle = envelopeTitle
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
    const envelope = new Envelope(
      0,
      this.trackId,
      this.dotDataId,
      this.start,
      this.end,
      this.offsetX,
      this.envelopeTitle
    )
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

  // 编码为字符串
  static stringify(envelope: Envelope, idMap: IdMap) {
    const result = []

    // 建立dotDataIdMap
    if (!idMap.dotDataIdMap.has(envelope.dotDataId)) {
      idMap.newDotDataId++
      idMap.dotDataIdMap.set(envelope.dotDataId, idMap.newDotDataId)
    }

    // 从idMap中获取新的id
    const { trackId, envelopeId, dotDataId, actTrackId } = envelope
    result.push(`"trackId":${idMap.trackIdMap.get(trackId)}`)
    result.push(`"envelopeId":${idMap.envelopeIdMap.get(envelopeId)}`)
    result.push(`"dotDataId":${idMap.dotDataIdMap.get(dotDataId)}`)
    result.push(`"actTrackId":${idMap.trackIdMap.get(actTrackId) || 0}`)

    // 处理普通属性
    for (const key of ['start', 'end', 'offsetX', 'envelopeTitle']) {
      result.push(`"${key}":${stringify(envelope[<keyof Envelope>key])}`)
    }

    return '{' + String(result) + '}'
  }
  // 解码
  static parse(object: EnvelopeObj, envelopeId: number) {
    const { trackId, dotDataId, start, end, offsetX, envelopeTitle, actTrackId } = object
    const envelope = new Envelope(envelopeId, trackId, dotDataId, start, end, offsetX, envelopeTitle)
    envelope.actTrackId = actTrackId

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
  set shape(shape) {
    this.dotData.shape = shape
  }
  get shape() {
    return this.dotData.shape
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
