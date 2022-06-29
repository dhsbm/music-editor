import { hitData } from '.'

/**
 * @description: 用来维持指针的样式
 * @param {cls} cls 要维持的指针样式
 * @return {void}
 */
const showHit = (cls: cls) => {
  hitData.class = cls
  hitData.style.pointerEvents = 'auto'
}

export default showHit

type cls = 'ns-resize' | 'ew-resize'
