import { stringify, fix } from 'modules/tools'
import { globalData } from 'modules/globalData'
import { DotObj, Category } from './Interface'
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

  // 编码为字符串
  static stringify(dot: Dot): string {
    const result = []
    for (const key of ['x', 'y']) {
      result.push(`"${key}":${stringify(dot[<keyof Dot>key])}`)
    }
    return '{' + String(result) + '}'
  }

  // 解码
  static parse(object: DotObj, dotDataId: number) {
    const dot = new Dot(dotDataId, object.x, object.y)
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
    const category = this.dotData.category
    const y = this.y
    if (category == Category.Volume) {
      // 声量
      return Math.round(y * 100 * 2) + '%'
    } else if (category == Category.Panner) {
      // 声像
      const str = y < 0.5 ? '右声道' : '左声道'

      return str + Math.round(Math.abs(y - 0.5) * 100 * 2) + '%'
    } else {
      throw Error('')
    }
  }
}

export default Dot
