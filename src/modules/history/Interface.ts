export interface HistoryItem {
  type: HistoryType
  describe: string
  [propNmae: string]: any
}

export enum HistoryType {
  Init,
  Track,
  Pattern,
  Note,
  Envelop,
  Dot,
}
