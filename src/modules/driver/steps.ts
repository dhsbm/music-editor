import { editorCanvasData, editorCanvasRender } from 'modules/canvas'
import { Pattern } from '@/class'
import { historyData, undo } from 'modules/history'
import { libraryData } from 'modules/library'
import { addNote } from 'modules/note'
import { addPattern, contentEditorData, showContentEditor } from 'modules/pattern'
import { showCenterPrompt } from 'modules/prompt'
import { changeZIndex } from 'modules/tools'

let pattern: Pattern

const steps = [
  // {
  //   element: '.soundTrack',
  //   popover: {
  //     title: '音轨列表',
  //     description: '在这里可以操作音轨',
  //     position: 'right-center',
  //   },
  // },
  // {
  //   element: '.edit',
  //   popover: {
  //     title: '工作区',
  //     description: '在这里创作、编配乐曲',
  //     position: 'mid-center',
  //   },
  // },
  // {
  //   element: '.headerControlBar',
  //   popover: {
  //     title: '控制条',
  //     description: '这里有各种控制选项<br>鼠标悬浮按钮会显示提示信息',
  //     position: 'bottom-center',
  //   },
  // },
  // {
  //   element: '.menu',
  //   popover: {
  //     title: '主菜单',
  //     description: '在这里可以创建、保存、打开项目文件',
  //     position: 'bottom',
  //   },
  // },
  // {
  //   element: '.mode',
  //   popover: {
  //     title: '工具栏',
  //     description: '在这里可以切换工具，操作工作区',
  //     position: 'bottom',
  //   },
  // },
  // {
  //   element: '.do',
  //   popover: {
  //     title: '撤销 & 重做',
  //     description: '对操作不满意，可以在这里撤销与重做<br>也绑定了快捷键ctrl+Z/ctrl+Y',
  //     position: 'bottom',
  //   },
  // },
  {
    element: '.window',
    popover: {
      title: '窗口列表',
      description: '在这里打开各种窗口，所有的窗口都可以拖动，部分窗口还允许缩放',
      position: 'left',
    },
    onNext() {
      historyData.show = true
      ;(<HTMLElement>document.querySelector('.history')).style.display = 'block'
      changeZIndex(historyData.style)
    },
  },
  {
    element: '.history',
    popover: {
      title: '历史记录窗口',
      description: '在这里用户进行每一步操作都会在这里记录，可以回退或直达操作过程中的任一状态',
      position: 'left',
    },
    onNext() {
      libraryData.show = true
      historyData.show = false
      ;(<HTMLElement>document.querySelector('.library')).style.display = 'block'
      changeZIndex(historyData.style)
    },
    onPrevious() {
      historyData.show = false
    },
  },
  {
    element: '.library',
    popover: {
      title: '音频素材库',
      description: '可以从这里选取素材拖拽至工作区中',
      position: 'left',
    },
    onNext() {
      libraryData.show = false
      pattern = addPattern(
        <MouseEvent>{
          offsetX: 0,
          offsetY: Infinity,
        },
        undefined,
        1
      )
    },
    onPrevious() {
      historyData.show = true
      libraryData.show = false
      ;(<HTMLElement>document.querySelector('.history')).style.display = 'block'
      changeZIndex(historyData.style)
    },
  },
  {
    element: '.app',
    popover: {
      title: '添加音频',
      description: '让我们双击工作区空白位置，添加一个音谱<br>按住shift则会添加无主包络',
      position: 'mid-center',
    },
    onNext() {
      showContentEditor(pattern)
      ;(<HTMLElement>document.querySelector('.contentEditor')).style.display = 'block'
      libraryData.show = false
    },
    onPrevious() {
      libraryData.show = true
      ;(<HTMLElement>document.querySelector('.library')).style.display = 'block'
      changeZIndex(historyData.style)
      undo()
      undo()
    },
  },
  {
    element: '.contentEditor',
    popover: {
      title: '音频内容编辑器',
      description: '双击或右键音谱，可以编辑其内容',
      position: 'mid-center',
    },
    onNext() {
      const { beatWidth, beatHeight } = editorCanvasData
      for (let i = 0; i < 7; i++) {
        addNote(<MouseEvent>{
          offsetX: (beatWidth * i) / 2,
          offsetY: beatHeight * (i + 1),
        })
      }
    },
    onPrevious() {
      contentEditorData.show = false
    },
  },
  {
    element: '.app',
    popover: {
      title: '添加音节',
      description: '与工作区的操作一样，在内容编辑器中添加音节',
      position: 'mid-center',
    },
    onNext() {
      showCenterPrompt('恭喜你完成了教程，开始你的音乐创作吧')
    },
    onPrevious() {
      for (let i = 0; i < 7; i++) {
        undo(false)
      }
      editorCanvasRender()
    },
  },
]

export default steps
