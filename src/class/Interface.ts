export interface IdMap {
  newTrackId: number
  newPatternId: number
  newNoteDataId: number
  newEnvelopeId: number
  newDotDataId: number
  trackIdMap: Map<number, number>
  patternIdMap: Map<number, number>
  noteDataIdMap: Map<number, number>
  envelopeIdMap: Map<number, number>
  dotDataIdMap: Map<number, number>
}

export interface DotObj {
  x: number
  y: number
}

export interface DotDataObj {
  envelopeIdSet: Array<number> // 生效的包络id
  dotList: Array<DotObj> // 节点的集合
  type: number // 类型
  category: number // 类别：音量、声相……
}

export interface EnvelopeObj {
  trackId: number // 所属的音轨id
  dotDataId: number // 绑定的节点数据id
  actTrackId: number // 作用于的音轨 0表示未绑定
  offsetX: number // 包络相对于音节数据的偏移位置
  start: number // 开始位置
  end: number // 结束位置
  envelopeTitle: string // 标题
}

export interface NoteObj {
  row: number
  start: number
  end: number
  volume: number
}
export interface NoteDataObj {
  noteDataId: number // 音节数据id
  patternIdSet: Array<number> // 使用此数据的音谱id
  noteMap: {
    [propName: string]: Array<NoteObj> // 音节数据
  }
}
export interface PatternObj {
  patternId: number //音谱id,若为假值则自动创建并备案
  trackId: number // 所属的父声轨的id
  noteDataId: number // 绑定音节数据的id
  start: number // 开始位置
  end: number // 结束位置
  offsetX: number // pattern相对于noteData 的偏移位置
  volume: number // 响度
  patternTitle: string // 音谱标题
}
export interface TrackObj {
  volume: number // 音轨响度
  source: number // 音源 (应该传入的时sourse类的id)
  color: string // 音轨颜色
  trackTitle: string // 音轨标题
  mute: boolean // 静音
  solo: boolean // 独奏
  patternIdSet: Array<number> // 音谱id集合
  envelopeIdSet: Array<number> // 所拥有的包络id
  envelopeIdList: Array<number> // 作用于此音轨的包络id
}

export interface ProjectObj {
  projectId: number // 项目id
  projectTitle: string // 项目标题
  introduce: string // 项目介绍
  authorId: string // 项目作者
  // 所有数据
  trackMap: {
    [prop: string]: TrackObj
  }
  patternMap: {
    [prop: string]: PatternObj
  }
  noteDataMap: {
    [prop: string]: NoteDataObj
  }
  envelopeMap: {
    [prop: string]: EnvelopeObj
  }
  dotDataMap: {
    [prop: string]: DotDataObj
  }

  // 用于自增id
  trackId: number
  patternId: number
  noteDataId: number
  envelopeId: number
  dotDataId: number
}
