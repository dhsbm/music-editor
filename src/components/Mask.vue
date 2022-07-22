<!-- 播放时遮罩层，拦截操作 -->
<template>
  <div v-if="maskData.show" :style="maskData.style" class="mask" @click="maskData.fun"></div>
</template>

<script setup lang="ts">
import { maskData } from 'modules/mask'
</script>

<style lang="scss" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0, 930px 0, 930px 50px, 750px 50px, 750px 0);
}
</style>
