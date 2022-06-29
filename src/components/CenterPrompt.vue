<template>
  <!-- 中央提示框 -->
  <!-- 不认识pointerEvents属性，断言成any -->
  <div class="centerPrompt" :style="(centerPromptData.style as any)" @click="hideCenterPrompt">
    {{ centerPromptData.content }}
  </div>
</template>

<script setup lang="ts">
import { centerPromptData, hideCenterPrompt } from 'modules/prompt'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
// 中央提示框样式
.centerPrompt {
  @include middle();
  pointer-events: auto;
  z-index: 99998;
  padding: 5px 25px;
  font-size: 24px;
  font-weight: 500;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  opacity: 0;
  transition: all 1s;
}
</style>
