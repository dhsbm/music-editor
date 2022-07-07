import { Note, NoteData } from '@/class'
import { editorCanvasData } from 'modules/canvas'
import { LibraryItem } from './Interface'

const libraryList = <Map<number, LibraryItem>>new Map()

export default libraryList

/**
 * @description: 创建一个随机音谱数据  仅用于开发阶段，创造假数据
 * @param {null}
 * @return {NoteData}
 */
const createNoteData = () => {
  const noteData = new NoteData(-1) // 传入-1,不备案
  for (let i = 0; i < 10; i++) {
    const row = (Math.random() * editorCanvasData.totalRows) | 0
    let start = (Math.random() * 4) | 0
    noteData.setNote(new Note(-1, row, start, start + 0.5))
    start = (start + 2) % 4
    noteData.setNote(new Note(-1, row, start, start + 0.5))
  }
  return noteData
}

/*
 * 初始化假数据
 * const roots = [1, 13, 21] // 根文件夹
 */
libraryList.set(1, {
  id: 1,
  type: 1, // 1表示文件夹，2表示音节文件，3表示波形文件
  level: 0, // 第几级文件，主要和缩进有关
  text: 'free',
  rhythm: '',
  tone: '',
  show: true,
  children: [2, 6],
})
libraryList.set(2, {
  id: 2,
  type: 1,
  level: 1,
  text: 'Bass',
  rhythm: '',
  tone: '',
  show: false,
  children: [3, 4, 5],
  parent: 1,
})
libraryList.set(3, {
  id: 3,
  type: 2,
  level: 2,
  text: 'Bass Chill1',
  rhythm: '100',
  tone: 'Eb',
  show: false,
  data: createNoteData(),
  parent: 2,
})
libraryList.set(4, {
  id: 4,
  type: 2,
  level: 2,
  text: 'Bass Chill2',
  rhythm: '100',
  tone: 'Eb',
  show: false,
  data: createNoteData(),
  parent: 2,
})
libraryList.set(5, {
  id: 5,
  type: 2,
  level: 2,
  text: 'Bass Chill3',
  rhythm: '90',
  tone: 'Eb',
  show: false,
  data: createNoteData(),
  parent: 2,
})
libraryList.set(6, {
  id: 6,
  type: 1,
  level: 1,
  text: 'Kits',
  rhythm: '',
  tone: '',
  show: false,
  children: [7, 10],
  parent: 1,
})
libraryList.set(7, {
  id: 7,
  type: 1,
  level: 2,
  text: 'Kit 01',
  rhythm: '',
  tone: '',
  show: false,
  children: [8, 9],
  parent: 6,
})
libraryList.set(8, {
  id: 8,
  type: 2,
  level: 3,
  text: 'Bass 1 Kit01',
  rhythm: '125',
  tone: 'Cm',
  show: false,
  data: createNoteData(),
  parent: 7,
})
libraryList.set(9, {
  id: 9,
  type: 2,
  level: 3,
  text: 'Synth 1 Kit01',
  rhythm: '125',
  tone: 'Cm',
  show: false,
  data: createNoteData(),
  parent: 7,
})
libraryList.set(10, {
  id: 10,
  type: 1,
  level: 2,
  text: 'Kit 02',
  rhythm: '',
  tone: '',
  show: false,
  children: [11, 12],
  parent: 6,
})
libraryList.set(11, {
  id: 11,
  type: 2,
  level: 3,
  text: 'Bass 1 Kit02',
  rhythm: '125',
  tone: 'Cm',
  show: false,
  data: createNoteData(),
  parent: 10,
})
libraryList.set(12, {
  id: 12,
  type: 2,
  level: 3,
  text: 'Guitar 1 Kit02',
  rhythm: '125',
  tone: 'Cm',
  show: false,
  data: createNoteData(),
  parent: 10,
})
libraryList.set(13, {
  id: 13,
  type: 1, // 1表示文件夹，2表示音节文件，3表示波形文件
  level: 0, // 第几级文件，主要和缩进有关
  text: 'Premium',
  rhythm: '',
  tone: '',
  show: true,
  children: [14, 16],
})
libraryList.set(14, {
  id: 14,
  type: 1,
  level: 1,
  text: 'Bass',
  rhythm: '',
  tone: '',
  show: false,
  children: [15],
  parent: 13,
})
libraryList.set(15, {
  id: 15,
  type: 2,
  level: 2,
  text: 'Bass SL 1',
  rhythm: '72',
  tone: 'Abm',
  show: false,
  data: createNoteData(),
  parent: 43,
})
libraryList.set(16, {
  id: 16,
  type: 1,
  level: 1,
  text: 'Brass',
  rhythm: '',
  tone: '',
  show: false,
  children: [17, 20],
  parent: 13,
})
libraryList.set(17, {
  id: 17,
  type: 1,
  level: 2,
  text: 'Chords',
  rhythm: '',
  tone: '',
  show: false,
  children: [18, 19],
  parent: 16,
})
libraryList.set(18, {
  id: 18,
  type: 2,
  level: 3,
  text: 'Synth 1 LM',
  rhythm: '70',
  tone: 'G',
  show: false,
  data: createNoteData(),
  parent: 17,
})
libraryList.set(19, {
  id: 19,
  type: 2,
  level: 3,
  text: 'Synth 2 LM',
  rhythm: '72',
  tone: 'Amb',
  show: false,
  data: createNoteData(),
  parent: 17,
})
libraryList.set(20, {
  id: 20,
  type: 2,
  level: 2,
  text: 'Brass Synth SL',
  rhythm: '90',
  tone: 'Am',
  show: false,
  data: createNoteData(),
  parent: 16,
})
libraryList.set(21, {
  id: 21,
  type: 1,
  level: 0,
  text: 'sample packs',
  rhythm: '',
  tone: '',
  show: true,
  children: [22],
})
libraryList.set(22, {
  id: 22,
  type: 1,
  level: 1,
  text: 'dubstep',
  rhythm: '',
  tone: '',
  show: false,
  children: [23, 24],
  parent: 21,
})
libraryList.set(23, {
  id: 23,
  type: 2,
  level: 2,
  text: 'dubstep dope',
  rhythm: '165',
  tone: '',
  show: false,
  data: createNoteData(),
  parent: 22,
})
libraryList.set(24, {
  id: 24,
  type: 2,
  level: 2,
  text: 'Full on crazy dubstep 1',
  rhythm: '165',
  tone: '',
  show: false,
  data: createNoteData(),
  parent: 22,
})
