<template>
  <!-- 边角处滑块 -->
  <div class="horizontalMoveScrollbar">
    <input v-model.number="canvasData.leftBeat" type="range" min="0.0" :max="canvasData.totalBeats" step="0.1" />
  </div>
  <div class="horizontalStretchScrollbar">
    <input
      v-model.number="canvasData.beatWidth"
      type="range"
      :min="canvasData.minBeatWidth"
      :max="canvasData.maxBeatWidth"
      step="2"
    />
  </div>
  <div v-show="!canvasData.scrollbarHide" class="verticalMoveScrollbar">
    <input
      v-model.number="canvasData.coverRadioY"
      type="range"
      min="0.0"
      max="1.0"
      step="0.00001"
      :style="canvasData.scrollbarStyle"
    />
  </div>
  <div class="verticalStretchScrollbar">
    <input
      v-model.number="canvasData.beatHeight"
      type="range"
      :min="canvasData.minBeatHeight"
      :max="canvasData.maxBeatHeight"
      step="0.1"
    />
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { CanvasData } from 'modules/canvas/Interface'

const props = defineProps<{
  canvasData: CanvasData
}>()

const canvasData = toRef(props, 'canvasData')
</script>

<style lang="scss" scoped>
@import 'scss/scrollbar.scss';
.horizontalMoveScrollbar {
  grid-area: horizontalMoveScrollbar;
  position: relative;
  input[type='range'] {
    @include input-scrollbar(100%, 14px, 32px);
  }
}
.horizontalStretchScrollbar {
  grid-area: horizontalStretchScrollbar;
  position: relative;
  padding-left: 5px;
  input[type='range'] {
    @include input-scrollbar(127px, 14px, 14px);
  }
}
.verticalMoveScrollbar {
  position: relative;
  grid-area: verticalMoveScrollbar;
  input[type='range'] {
    @include input-scrollbar(600px, 14px, 32px);
    @include rotate-input-scrollbar();
  }
}
.verticalStretchScrollbar {
  grid-area: verticalStretchScrollbar;
  position: relative;
  input[type='range'] {
    @include input-scrollbar(102px, 14px, 14px);
    @include rotate-input-scrollbar();
  }
}
</style>
