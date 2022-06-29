import { drawEnvelope } from 'modules/envelope'
import { drawPattern } from 'modules/pattern'
import { prePointData } from '.'
import { Pattern, Envelope, Note } from '@/class'

/**
 * @description: 修改指针之前所指的数据
 * @param {'pattern' | 'note' | 'envelope'} property 要修改的属性名
 * @param {Pattern | Envelope | Note} [newValue] 新属性值
 * @return {void}
 */
const changePrePointData = (
  property: 'pattern' | 'note' | 'envelope',
  newValue: Pattern | Envelope | Note | undefined
) => {
  if (property === 'pattern') {
    const { pattern } = prePointData
    if (pattern === newValue) return
    if (pattern != undefined) drawPattern(pattern)
    prePointData.pattern = <Pattern>newValue
    if (prePointData.pattern != undefined) drawPattern(prePointData.pattern, true)
  } else if (property === 'note') {
    prePointData.note = <Note>newValue
  } else if (property === 'envelope') {
    const { envelope } = prePointData
    if (envelope === newValue) return
    if (envelope != undefined) drawEnvelope(envelope)
    prePointData.envelope = <Envelope>newValue
    if (prePointData.envelope != undefined) drawEnvelope(prePointData.envelope, true)
  }
}

export default changePrePointData
