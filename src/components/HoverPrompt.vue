<template>
  <!-- 指针悬浮提示框 -->
  <div v-show="hoverPromptData.show" class="hoverPrompt" :style="hoverPromptData.style">
    {{ hoverPromptData.text }}
    <div class="arrow" :style="hoverPromptData.arrowStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { hoverPromptData } from 'modules/prompt'
</script>

<style lang="scss" scoped>
// 提示框样式
.hoverPrompt {
  position: absolute;
  z-index: 99998;
  transform: translateX(-50%);
  font-size: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 3px;
  .arrow {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    width: 10px;
    height: 5px;
    left: 50%;
    transform: translateX(-50%);
    // top: -4px;
    // clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  }
}
</style>
