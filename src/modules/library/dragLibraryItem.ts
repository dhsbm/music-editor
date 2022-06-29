import { libraryData } from '.'

/**
 * @description: 拖拽音频素材，保存其id
 * @param {number} id 拖拽素材的id
 * @return {void}
 */
const dragLibraryItem = (id: number) => {
  libraryData.dragId = id
}

export default dragLibraryItem
