export interface CanvasData {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  mobile: boolean
  beatWidth: number
  maxBeatWidth: number
  minBeatWidth: number
  beatHeight: number
  maxBeatHeight: number
  minBeatHeight: number
  totalBeats: number
  coverRadioY: number
  editAreaHeight: number
  editAreaWidth: number
  leftBeat: number
  rightBeat: number
  totalHeight: number
  difHeight: number
  coverPixelY: number
  style: { cursor: string }
  cutLineStyle: { transform: string }
  selectBoxStyle: SelectBoxStyle
  scrollbarStyle: { width: string }
  scrollbarHide?: boolean
}

export interface SelectBoxStyle {
  outlineWidth: string
  top: string
  left: string
  width: string
  height: string
}
