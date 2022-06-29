import { addPattern } from 'modules/pattern'
import { libraryData, libraryList } from '.'
import { NoteData } from '@/class'

/**
 * @description: 在工作区放下音乐素材
 * @param {MouseEvent} e 事件对象
 * @return {void}
 */
const dropLibraryItem = (e: MouseEvent) => {
  if (libraryData.dragId) {
    addPattern(e, <NoteData>libraryList.get(libraryData.dragId)?.data?.clone())
    libraryData.dragId = 0
  }
}

export default dropLibraryItem
