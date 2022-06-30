<template>
  <!-- 上下左右拉伸 -->
  <div class="upResize" @mousedown="resizeDom($event, Direction.Up, props.data.style)"></div>
  <div class="leftResize" @mousedown="resizeDom($event, Direction.Left, props.data.style)"></div>
  <div class="rightResize" @mousedown="resizeDom($event, Direction.Right, props.data.style)"></div>
  <div class="downResize" @mousedown="resizeDom($event, Direction.Down, props.data.style)"></div>
</template>

<script setup lang="ts">
import { resizeDom } from 'modules/tools'
import { Direction } from 'modules/tools/Interfacs'

interface Style {
  transform: string
  height: string
  width: string
  minHeight: string
  minWidth: string
}
const props = defineProps<{
  data: { style: Style }
}>()
</script>

<style lang="scss" scoped>
.upResize,
.downResize {
  position: absolute;
  height: 5px;
  width: 100%;
  z-index: 4;
  cursor: ns-resize;
}
.leftResize,
.rightResize {
  position: absolute;
  height: 100%;
  width: 5px;
  z-index: 4;
  cursor: ew-resize;
}
.upResize {
  top: -3px;
}
.downResize {
  bottom: -3px;
}
.leftResize {
  left: -3px;
}
.rightResize {
  right: -3px;
}
</style>
