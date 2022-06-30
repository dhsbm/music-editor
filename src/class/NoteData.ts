import { globalData } from 'modules/globalData'
import { Note, Pattern } from '.'
import { NoteDataObj, IdMap } from './Interface'

// 音节容器类
class NoteData {
  noteDataId: number //音节数据id,若为假值则自动创建并备案
  patternIdSet: Set<number> // 绑定的音谱
  noteMap: Map<number, Set<Note>> // 音节数据
  constructor(noteDataId: number) {
    this.noteDataId = noteDataId || globalData.project.newNoteData(this)
    this.patternIdSet = new Set() // 值为pattern的id
    this.noteMap = new Map() // 键是row，值是音节的集合
  }
  // 添加音谱
  addPattern(pattern: Pattern) {
    this.patternIdSet.add(pattern.patternId)
  }
  // 删除音谱
  deletePattern(pattern: Pattern) {
    this.patternIdSet.delete(pattern.patternId)
  }
  // 添加音节
  setNote(note: Note) {
    const row = note.row
    if (!this.noteMap.get(row)) this.noteMap.set(row, new Set())
    this.noteMap.get(row)?.add(note)
  }
  // 删除音节
  deleteNote(note: Note) {
    this.noteMap.get(note.row)?.delete(note)
  }
  // 获取音节集合
  getNotes(row: number) {
    const result = this.noteMap.get(row)
    return result ? result : <Set<Note>>new Set()
  }

  hasNote(note: Note) {
    return this.noteMap.get(note.row)?.has(note)
  }
  // 克隆音节数据
  clone() {
    const noteData = new NoteData(0)
    for (const [, noteSet] of this.noteMap) {
      for (const note of noteSet) {
        const clone = note.clone()
        noteData.setNote(clone)
        clone.noteData = noteData
      }
    }
    return noteData
  }

  // 编码为字符串
  static stringify(noteData: NoteData, idMap: IdMap) {
    const result = []
    result.push(`"noteDataId":${idMap.noteDataIdMap.get(noteData.noteDataId)}`)

    // 处理音谱id集合
    const patternIdSet = []
    for (const patternId of noteData.patternIdSet) {
      patternIdSet.push(idMap.patternIdMap.get(patternId))
    }
    result.push(`"patternIdSet":[${String(patternIdSet)}]`)

    // 处理音节映射
    const noteMap = []
    for (const [row, notes] of noteData.noteMap) {
      if (notes.size == 0) continue
      const noteSet = []
      for (const note of notes) {
        noteSet.push(Note.stringify(note))
      }
      noteMap.push(`"${row}":[${String(noteSet)}]`)
    }
    result.push(`"noteMap":{${String(noteMap)}}`)

    return '{' + String(result) + '}'
  }

  // 解析对象
  static parse(object: NoteDataObj, noteDataId: number) {
    const noteData = new NoteData(noteDataId)

    // 建立音谱id集合
    noteData.patternIdSet = new Set(object.patternIdSet)

    // 建立音节映射
    const noteMap = new Map()
    for (const row of Object.keys(object.noteMap)) {
      const noteSet = new Set()

      for (const note of object.noteMap[row]) {
        noteSet.add(Note.parse(note, noteDataId))
      }

      noteMap.set(parseInt(row), noteSet)
    }
    noteData.noteMap = noteMap

    return noteData
  }
}

export default NoteData
