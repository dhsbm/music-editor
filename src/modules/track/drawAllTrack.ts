import { drawTrack, trackData } from '.'

/**
 * @description: 绘制所有音轨
 * @return {void}
 */
const drawAllTrack = () => {
  for (const track of trackData.sortedTrackData) {
    drawTrack(track)
  }
}

export default drawAllTrack
