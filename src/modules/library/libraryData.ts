import { reactive, computed, watch } from 'vue'
import { changeZIndex } from 'modules/tools'
import { libraryList } from '.'
import { LibraryItem } from './Interface'

const roots = [1, 13, 21] // 根文件夹

// 素材库数据
const libraryData = reactive({
  show: false, // 显示/隐藏
  libraryList, // 素材列表
  dragId: 0, // 目前拖拽的id
  searchKey: '',
  // 拖动元素使用
  style: {
    zIndex: 4,
    transform: 'translate(0px, 0px)',
  },
  shownLibraryList: computed(() => {
    const res = <LibraryItem[]>[]
    const searchKey = libraryData.searchKey.trim().toLowerCase()
    if (searchKey != '') {
      const set = <Set<LibraryItem>>new Set()
      for (const [, item] of libraryList) {
        const { text, rhythm, tone } = item
        if (
          text.toLowerCase().includes(searchKey) ||
          rhythm.toLowerCase().includes(searchKey) ||
          tone.toLowerCase().includes(searchKey)
        ) {
          addParent(item, set)
          addChildren(item, set)
        }
      }
      res.push(...set)
    } else {
      findShownLibraryList(res, roots)
    }
    return res
  }),
})

// 每次显示时，呈现到页面最前方
watch(
  () => libraryData.show,
  (now) => now && changeZIndex(libraryData.style)
)

export default libraryData

// 递归插入父文件夹
const addParent = (item: LibraryItem, set: Set<LibraryItem>) => {
  const parent = libraryList.get(item.parent!)
  if (parent) {
    addParent(parent, set)
    set.add(parent)
  }
}
// 递归插入子素材
const addChildren = (item: LibraryItem, set: Set<LibraryItem>) => {
  set.add(item)
  const children = item.children
  if (children) {
    for (const id of children) {
      addChildren(libraryList.get(id)!, set)
    }
  }
  return set
}

// 递归查询要展示的素材列表
const findShownLibraryList = (result: LibraryItem[], roots: number[]) => {
  for (const id of roots) {
    const item = libraryData.libraryList.get(id)
    if (item && item.show) {
      result.push(item)
      if (item.children) {
        findShownLibraryList(result, item.children)
      }
    }
  }
}
