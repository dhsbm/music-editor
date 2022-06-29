import { Track } from '@/class'
import { trackData } from '.'

/**
 * @description: 切换独奏开关
 * @param {Track} track 要切换的音轨
 * @return {void}
 */
const switchSolo = (track: Track) => {
  if (track.solo) track.solo = false
  else {
    for (const track of trackData.trackMap.values()) {
      track.solo = false
    }
    track.solo = true
    track.mute = false
  }
}

export default switchSolo
