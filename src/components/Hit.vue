<template>
  <!-- 点击后出现，用于保留指针效果 -->
  <div class="hit" :class="hitData.class" :style="(hitData.style as any)"></div>
</template>

<script setup lang="ts">
import { hitData } from 'modules/hit'
</script>

<style lang="scss" scoped>
.hit {
  position: absolute;
  pointer-events: none;
  z-index: 99999;
  // pointer-events: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
