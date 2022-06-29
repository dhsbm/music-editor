import { selectedEnvelopeList } from '.'

/**
 * @description: 获取激活的音谱（最后添加进选择区的音谱）
 * @return {Envelope} 当前激活的音谱
 */
const getActiveEnvelope = () => {
  const list = [...selectedEnvelopeList]
  return list[list.length - 1]
}

export default getActiveEnvelope
