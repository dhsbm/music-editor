import { Track } from '@/class'

/**
 * @description: 切换静音开关
 * @param {Track} track 要切换的音轨
 * @return {void}
 */
const switchMute = (track: Track) => {
  if (track.mute) track.mute = false
  else {
    track.solo = false
    track.mute = true
  }
}

export default switchMute
