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
  // 拖动元素使用
  style: {
    zIndex: 4,
    transform: 'translate(-150px, -300px)',
  },
  shownLibraryList: computed(() => {
    const res = <LibraryItem[]>[]
    findShownLibraryList(res, roots)
    return res
  }),
})

/**
 * @description: 查询展示的素材列表
 * @param {LibraryItem[]} result 存储结果的数据
 * @param {number[]} roots 根文件夹编号数组
 * @return {null}
 */
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

// 每次显示时，呈现到页面最前方
watch(
  () => libraryData.show,
  (now) => now && changeZIndex(libraryData.style)
)

export default libraryData
