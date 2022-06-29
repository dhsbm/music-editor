import { Envelope, Dot } from '.'
import { globalData } from 'modules/globalData'
import { stringify } from 'modules/tools'
import { IdMap, DotDataObj } from './Interface'
const defaultList = [0, 0.8, 0.5, 0.5]
const range = [0, 1, 1, 2]

// 节点数据类
class DotData {
  dotDataId: number // 节点数据id 若为0则自动申请
  envelopeIdSet: Set<number> // 生效的包络id
  dotList: Array<Dot> // 节点的集合
  type: number // 类型
  category: number // 类别：音量、声相……
  constructor(dotDataId: number) {
    this.dotDataId = dotDataId || globalData.project.newDotData(this)
    this.envelopeIdSet = new Set() // 值为envelope的id
    this.dotList = [] // 点的集合
    //类型：1、2、3、4
    //对应：折线、正向水平线、反向水平线、1/2正弦
    this.type = 1
    this.category = 1 // 类别：音量、声相……
  }
  // 添加包络
  addEnvelope(envelope: Envelope) {
    this.envelopeIdSet.add(envelope.envelopeId)
  }
  // 删除包络
  deleteEnvelope(envelope: Envelope) {
    this.envelopeIdSet.delete(envelope.envelopeId)
  }
  // 添加节点
  addDot(dot: Dot) {
    let i = 0
    for (; i < this.dotList.length; i++) {
      if (this.dotList[i].x > dot.x) break
    }
    this.dotList.splice(i, 0, dot)
  }
  // 删除节点
  deleteDot(dot: Dot) {
    const i = this.dotList.indexOf(dot)
    this.dotList.splice(i, 1)
  }

  hasDot(dot: Dot): boolean {
    return this.dotList.includes(dot)
  }
  // 克隆节点数据
  clone(): DotData {
    const dotData = new DotData(0)
    dotData.type = this.type
    dotData.category = this.category
    for (const dot of this.dotList) {
      const clone = dot.clone()
      dotData.addDot(dot)
      clone.dotData = dotData
    }
    return dotData
  }
  // 键
  static keys() {
    return ['type', 'category']
  }

  // 编码为字符串
  static stringify(dotData: DotData, idMap: IdMap) {
    const result = []
    result.push(`"dotDataId":${idMap.dotDataIdMap.get(dotData.dotDataId)}`)

    // 处理普通属性
    for (const key of <[]>DotData.keys()) {
      result.push(`"${key}":${stringify(dotData[key])}`)
    }

    // 处理包络id集合
    const envelopeIdSet = []
    for (const envelopeId of dotData.envelopeIdSet) {
      envelopeIdSet.push(idMap.envelopeIdMap.get(envelopeId))
    }
    result.push(`"envelopeIdSet":[${String(envelopeIdSet)}]`)

    // 处理节点映射
    const dotList = []
    for (const dot of dotData.dotList) {
      dotList.push(Dot.stringify(dot))
    }
    result.push(`"dotList":[${String(dotList)}]`)

    return '{' + String(result) + '}'
  }

  // 解析对象
  static parse(object: DotDataObj, dotDataId: number) {
    const dotData = new DotData(dotDataId)

    // 处理普通属性
    for (const key of <[]>DotData.keys()) {
      dotData[key] = object[key]
    }

    // 建立音谱id集合
    const envelopeIdSet: Set<number> = new Set()
    for (const envelopeId of object.envelopeIdSet) {
      envelopeIdSet.add(envelopeId)
    }
    dotData.envelopeIdSet = envelopeIdSet

    // 建立音节映射
    const dotList = []
    for (const dot of object.dotList) {
      dotList.push(Dot.parse(dot, dotDataId))
    }
    dotData.dotList = dotList

    return dotData
  }
  // 默认值
  get defaultValue() {
    return defaultList[this.category]
  }
  // 范围
  get range() {
    return range[this.category]
  }
}

export default DotData
