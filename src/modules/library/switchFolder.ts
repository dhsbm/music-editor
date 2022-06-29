import { libraryData, libraryList } from '.'

/**
 * @description: 打开/折叠文件夹
 * @param {number} id 文件夹的id
 * @return {void}
 */
const switchFolder = (id: number) => {
  const item = libraryList.get(id)
  if (item && item.children) {
    for (const childId of item.children) {
      const child = libraryData.libraryList.get(childId)
      child && (child.show = !child.show)
    }
  }
}

export default switchFolder
