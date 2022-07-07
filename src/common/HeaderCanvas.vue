<template>
  <!-- 顶部canvas组件 -->
  <div class="wrapper">
    <canvas ref="headerCanvas" @click="changeIndicator($event, beatWidth, leftBeat)"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { changeIndicator } from 'modules/indicator'
import { canvasData } from 'modules/canvas'
const props = defineProps<{
  leftBeat: number
  beatWidth: number
  sig: number
}>()
let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D

const render = () => {
  const { sig, beatWidth, leftBeat } = props
  const { lineWidth, lineColor } = canvasData
  const initialValue = Math.floor(leftBeat) // 最左边是第几段
  const remainPixel = ((initialValue + 1 - leftBeat) % 1) * beatWidth // 上一段的剩余px
  ctx.clearRect(0, 0, canvas.width, 30)
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = lineColor
  ctx.font = '10px sans-serif'
  ctx.beginPath()
  for (let i = -1; i * beatWidth < canvas.width; i++) {
    const offsetX = i * beatWidth + remainPixel
    const num = remainPixel > 0 ? initialValue + i + 1 : initialValue + i
    if (num % 4 == 0) {
      ctx.moveTo(offsetX, 0)
      ctx.lineTo(offsetX, 30)
      ctx.strokeText(num / 4 + 1 + '', offsetX + 3, 15)
    } else {
      ctx.moveTo(offsetX, 15)
      ctx.lineTo(offsetX, 30)
    }
    // 画单元线
    for (let j = 1; j < sig; j++) {
      ctx.moveTo(offsetX + (j * beatWidth * 4) / sig, 20)
      ctx.lineTo(offsetX + (j * beatWidth * 4) / sig, 30)
    }
  }
  ctx.stroke()
  ctx.closePath()
}

watch(() => [props.leftBeat, props.beatWidth, props.sig], render)

const headerCanvas = ref(null)

onMounted(() => {
  canvas = headerCanvas.value as any as HTMLCanvasElement
  ctx = canvas.getContext('2d')!
  canvas.width = 2000
  canvas.height = 30
  render()
})
</script>

<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
  canvas {
    margin-left: 10px;
    height: 30px;
    width: 2000px;
    background-color: #393d40;
  }
}
</style>
