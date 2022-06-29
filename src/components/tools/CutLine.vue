<template>
  <div v-show="mode == 3" class="cutLine" :style="cutLineStyle"></div>
</template>

<script setup lang="ts">
import { mode } from 'modules/globalData'

defineProps({
  cutLineStyle: Object,
})
</script>

<style lang="scss" scoped>
.cutLine {
  z-index: 4;
  pointer-events: none;
  height: 100%;
  width: 1px;
  background-color: white;
  position: absolute;
}
</style>
