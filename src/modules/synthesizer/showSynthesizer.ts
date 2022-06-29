import { changeZIndex } from 'modules/tools'
import { Track } from '@/class'
import { synthesizerData } from '.'

/**
 * @description: 显示合成器
 * @param {Track} track 绑定的音轨 代理对象
 * @return {*}
 */
const showSynthesizer = (track: Track) => {
  synthesizerData.show = true
  synthesizerData.track = track
  changeZIndex(synthesizerData.style)
}

export default showSynthesizer
