// 之前指针处的乐谱/音节

import { Pattern, Envelope, Note } from '@/class'

const prePointData: PrePointData = {
  pattern: undefined,
  note: undefined,
  envelope: undefined,
}

export default prePointData

interface PrePointData {
  pattern?: Pattern
  note?: Note
  envelope?: Envelope
}
