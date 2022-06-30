<!-- 播放时遮罩层，拦截操作 -->
<template>
  <div v-if="timeData.playing" class="timeMask" @click="showCenterPrompt('播放期间禁止操作，请先暂停播放')"></div>
</template>

<script setup lang="ts">
import { showCenterPrompt } from 'modules/prompt'
import { timeData } from 'modules/time'
</script>

<style lang="scss" scoped>
.timeMask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 0, 930px 0, 930px 50px, 750px 50px, 750px 0);
}
</style>
