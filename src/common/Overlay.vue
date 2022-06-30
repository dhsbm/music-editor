<template>
  <!-- 上方循环遮罩层 -->
  <div class="overlay">
    <div class="slider" :style="overlayData.style" @mousedown="moveOverlay($event, beatWidth)">
      <div class="left" :style="`background:${overlayData.color};`" @mousedown="overlayData.changeStart = true"></div>
      <div class="screen"></div>
      <div class="right" :style="`background:${overlayData.color};`" @mousedown="overlayData.changeEnd = true"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { overlayData, moveOverlay } from 'modules/overlay'
defineProps<{
  beatWidth: number
}>()
</script>

<style lang="scss" scoped>
.overlay {
  z-index: 1;
  width: 100%;
  height: 6px;
  position: absolute;
  top: 0;
  background-color: black;
  .slider {
    position: absolute;
    background-color: blue;
    width: 320px;
    left: 10px;
    height: 6px;
    .screen {
      pointer-events: none; /* 实现点击穿透 */
      height: 100vh;
      background-color: rgba(255, 255, 255, 0.1);
    }
    .left {
      top: 0;
      width: 10px;
      height: 20px;
      position: absolute;
      background-color: blue;
      -webkit-clip-path: polygon(0% 0%, 0% 100%, 100% 0%);
      clip-path: polygon(0% 0%, 0% 100%, 100% 0%);
      &:hover {
        cursor: w-resize;
      }
    }
    .right {
      top: 0;
      right: 0;
      width: 10px;
      height: 20px;
      position: absolute;
      background-color: blue;
      -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
      &:hover {
        cursor: w-resize;
      }
    }
  }
}
</style>
