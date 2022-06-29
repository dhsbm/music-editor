import { synthesizerData } from '.'

/**
 * @description: 隐藏合成器
 * @return {void}
 */
const hideSynthesizer = () => {
  synthesizerData.show = false
  synthesizerData.track = undefined
}

export default hideSynthesizer
