<template>
  <!-- 指针 -->
  <div class="indicator" :style="style" @mousedown="moveIndicator($event, beatWidth)"></div>
</template>

<script setup lang="ts">
import { indicatorData, moveIndicator } from 'modules/indicator'
import { computed } from 'vue'
const props = defineProps<{
  beatWidth: number
  leftBeat: number
}>()
const style = computed(() => `transform:translateX(${props.beatWidth * (indicatorData.start - props.leftBeat)}px)`)
</script>

<style lang="scss" scoped>
.indicator {
  height: 800px;
  position: absolute;
  pointer-events: none;
  left: 10px;
  top: 23px;
  width: 1px;
  z-index: 1;
  background-color: white;
  &::before {
    content: '';
    pointer-events: auto;
    position: absolute;
    top: -7px;
    left: -4px;
    width: 9px;
    height: 15px;
    background-color: white;
    clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%);
  }
}
</style>
