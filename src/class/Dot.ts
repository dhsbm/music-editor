import { stringify, fix } from 'modules/tools'
import { globalData } from 'modules/globalData'
import { DotObj } from './Interface'
// 包络中的点类
class Dot {
  private _x: number // 横向位置，单位beat
  private _y: number // 纵向位置，0~1
  dotDataId: number // 所属的包络数据
  constructor(dotDataId: number, x = 0, y = 0) {
    this.dotDataId = dotDataId
    this._x = 0 // 私有属性
    this._y = 0 // 私有属性
    this.x = x // 横向位置，单位beat
    this.y = y // 纵向位置，0~1
  }

  // 克隆节点
  clone(): Dot {
    return new Dot(this.dotDataId, this.x, this.y)
  }
  // 将节点添加包络数据中
  addSelf() {
    this.dotData.addDot(this)
  }
  // 从包络数据删除节点
  deleteSelf() {
    this.dotData.deleteDot(this)
  }

  // 编码时用到的keys
  static keys() {
    return ['x', 'y']
  }

  // 编码为字符串
  static stringify(dot: Dot): string {
    const result = []
    for (const key of <[]>Dot.keys()) {
      result.push(`"${key}":${stringify(dot[key])}`)
    }
    return '{' + String(result) + '}'
  }

  // 解码
  static parse(object: DotObj, dotDataId: number) {
    const dot = new Dot(dotDataId)
    for (const key of <[]>Dot.keys()) {
      dot[key] = object[key]
    }
    return dot
  }

  // 所属的节点数据
  get dotData() {
    return globalData.project.getDotData(this.dotDataId)
  }
  set dotData(dotData) {
    this.dotDataId = dotData.dotDataId
  }
  // 节点数据的节点列表
  get dotList() {
    return this.dotData.dotList
  }

  set x(value) {
    this._x = fix(value, 6)
  }
  get x() {
    return this._x
  }

  set y(value) {
    this._y = fix(value, 6)
  }
  get y() {
    return this._y
  }

  // 前一个节点
  get preDot() {
    const dotList = this.dotList
    const i = dotList.indexOf(this)
    return dotList[i - 1]
  }
  // 后一个节点
  get nextDot() {
    const dotList = this.dotList
    const i = dotList.indexOf(this)
    return dotList[i + 1]
  }
  // 根据类别显示数据
  get value() {
    // todos 这里应该根据类别显示
    return this.y.toFixed(2)
  }
}

export default Dot
