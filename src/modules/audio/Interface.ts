import { Category, Shape } from '@/class/Interface'

export interface Source {
  type: OscillatorType
  attackTime: number
  decayTime: number
  releaseTime: number
  sustainLevel: number
}

export type AudioData = {
  trackId: number
  source: Source
  noteMap: Map<number, Set<NoteData>>
  envelopeSet: Set<EnvelopeDate>
}[]

export interface EnvelopeDate {
  start: number
  end: number
  category: Category
  shape: Shape
  dotList: DotData[]
}

export interface NoteData {
  start: number
  end: number
  volume: number
}

export interface DotData {
  x: number
  y: number
}
