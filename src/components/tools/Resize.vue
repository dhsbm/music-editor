<template>
  <!-- 上下左右拉伸 -->
  <div class="topResize" @mousedown="resizeDom($event, 'top', props.data.style)"></div>
  <div class="leftResize" @mousedown="resizeDom($event, 'left', props.data.style)"></div>
  <div class="rightResize" @mousedown="resizeDom($event, 'right', props.data.style)"></div>
  <div class="bottomResize" @mousedown="resizeDom($event, 'bottom', props.data.style)"></div>
</template>

<script setup lang="ts">
import { resizeDom } from 'modules/tools'
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
.topResize,
.bottomResize {
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
.topResize {
  top: -3px;
}
.bottomResize {
  bottom: -3px;
}
.leftResize {
  left: -3px;
}
.rightResize {
  right: -3px;
}
</style>
