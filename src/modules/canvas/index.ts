// 画布模块中间层

import canvasData from './canvasData'
import drawHorizontalLines from './drawHorizontalLines'
import drawVerticalLines from './drawVerticalLines'
import drawPiano from './editorCanvas/drawPiano'
import pressPiano from './editorCanvas/pressPiano'
import rollCanvas from './rollCanvas'
import changePrePointData from './changePrePointData'

import workerCanvasData from './workerCanvas/workerCanvasData'
import workerCanvasRender from './workerCanvas/workerCanvasRender'
import mousedownWorkerCanvas from './workerCanvas/mousedownWorkerCanvas'
import mousemoveWorkerCanvas from './workerCanvas/mousemoveWorkerCanvas'
import mouseleaveWorkerCanvas from './workerCanvas/mouseleaveWorkerCanvas'
import dblclickWorkerCanvas from './workerCanvas/dblclickWorkerCanvas'
import keydownWorkerCanvas from './workerCanvas/keydownWorkerCanvas'

import editorCanvasData from './editorCanvas/editorCanvasData'
import editorPianoCanvasData from './editorCanvas/editorPianoCanvasData'
import prePointData from './prePointData'
import editorCanvasRender from './editorCanvas/editorCanvasRender'
import mousedownEditorCanvas from './editorCanvas/mousedownEditorCanvas'
import mousemoveEditorCanvas from './editorCanvas/mousemoveEditorCanvas'
import mouseleaveEditorCanvas from './editorCanvas/mouseleaveEditorCanvas'
import dblclickEditorCanvas from './editorCanvas/dblclickEditorCanvas'
import keydownEditorCanvas from './editorCanvas/keydownEditorCanvas'

export {
  canvasData,
  drawHorizontalLines,
  drawVerticalLines,
  drawPiano,
  pressPiano,
  rollCanvas,
  changePrePointData,
  workerCanvasData,
  workerCanvasRender,
  mousedownWorkerCanvas,
  mousemoveWorkerCanvas,
  mouseleaveWorkerCanvas,
  dblclickWorkerCanvas,
  keydownWorkerCanvas,
  editorCanvasData,
  editorPianoCanvasData,
  prePointData,
  editorCanvasRender,
  mousedownEditorCanvas,
  mousemoveEditorCanvas,
  mouseleaveEditorCanvas,
  dblclickEditorCanvas,
  keydownEditorCanvas,
}
