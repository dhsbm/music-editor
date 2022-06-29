import { stringify, fix } from 'modules/tools'
import { globalData } from 'modules/globalData'
import { NoteObj } from './Interface'

// 音节类
class Note {
  noteDataId: number // 所属父容器的id
  row: number //音节所在行数
  private _start: number // 开始位置
  private _end: number // 结束位置
  constructor(noteDataId: number, row = 0, start = 0, end = 1) {
    this.noteDataId = noteDataId
    this._start = 0
    this._end = 0
    this.row = row
    this.start = start // 初始位置 与父容器的相对位置
    this.end = end // 结束位置 与父容器的相对位置
  }

  // 克隆当前音节
  clone() {
    return new Note(this.noteDataId, this.row, this.start, this.end)
  }
  // 向音节数据添加自己
  addSelf() {
    this.noteData.setNote(this)
  }
  // 从音节数据删除自己
  deleteSelf() {
    this.noteData.deleteNote(this)
  }

  // 编码时用到的keys
  static keys() {
    return ['row', 'start', 'end']
  }

  // 编码为字符串
  static stringify(note: Note) {
    const result = []
    for (const key of <[]>Note.keys()) {
      result.push(`"${key}":${stringify(note[key])}`)
    }
    return '{' + String(result) + '}'
  }

  // 解码
  static parse(object: NoteObj, noteDataId: number) {
    const note = new Note(noteDataId)
    for (const key of <[]>Note.keys()) {
      note[key] = object[key]
    }
    return note
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
  // 所属的音节数据
  get noteData() {
    return globalData.project.getNoteData(this.noteDataId)
  }
  set noteData(noteData) {
    this.noteDataId = noteData.noteDataId
  }
}

export default Note
