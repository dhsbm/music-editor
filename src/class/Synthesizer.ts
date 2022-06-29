// 合成器类
class Synthesizer {
  SynthesizerId: number //合成器id
  trackId: number // 所属音轨的id

  constructor(SynthesizerId: number, trackId: number) {
    this.SynthesizerId = SynthesizerId
    this.trackId = trackId
  }
}

export default Synthesizer
