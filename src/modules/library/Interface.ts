import { NoteData } from '@/class'

export interface LibraryItem {
  id: number
  type: number
  level: number
  text: string
  rhythm: string
  tone: string
  show: boolean
  children?: number[]
  parent?: number
  data?: NoteData
}
