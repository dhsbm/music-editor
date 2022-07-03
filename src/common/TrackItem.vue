<template>
  <div class="container">
    <div class="trackItem" :style="`height:${height}px;`" :data-trackId="track.trackId" data-name="item">
      <div class="trackSettings">
        <p class="name" data-name="name">{{ track.trackTitle }}</p>
        <input v-model.number="volume" type="range" min="0" max="2" step="0.01" />
        <div class="trackButtons">
          <button :style="track.mute ? 'background: black;color:white;' : ''" data-name="mute">M</button>
          <button :style="track.solo ? 'background: black;color:white;' : ''" data-name="solo">S</button>
        </div>
      </div>
      <div class="panel" :style="'background:' + track.color + ';'"></div>
      <div v-show="selected" class="border"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Track } from '@/class'
import { ref, watch } from 'vue'
const prop = defineProps<{
  track: Track
  height: number
  selected: boolean
  volume: number
}>()
const emit = defineEmits(['update:volume'])
const volume = ref(prop.track.volume)
watch(volume, (now) => {
  emit('update:volume', now)
})
watch(
  () => prop.volume,
  (now) => {
    volume.value = now
  }
)
</script>

<style lang="scss" scoped>
@import 'scss/scrollbar.scss';

.container {
  display: flex;
  .trackItem {
    position: relative;
    z-index: 5;
    display: flex;
    flex-shrink: 0;
    width: 140px;
    height: 80px;
    background: rgb(82, 83, 78);
    border-bottom: 1px #1c1e21 solid;
    overflow: hidden;
    .trackSettings {
      padding-top: 5px;
      padding-left: 10px;
      flex: 1;
      .name {
        cursor: ns-resize;
      }
      input[type='range'] {
        @include input-scrollbar(100px, 14px, 18px);
        position: static;
        // vertical-align: baseline;
      }
      .trackButtons {
        margin-top: 10px;
        display: flex;
        button {
          margin-left: 20px;
          color: rgba(255, 248, 222, 0.5);
          background-color: transparent;
          width: 14px;
          height: 14px;
          font-size: 14px;
          text-align: center;
          line-height: 14px;
          border: 0;
          &:hover {
            background-color: black;
          }
        }
      }
    }
    .panel {
      width: 16px;
    }
    .border {
      position: absolute;
      pointer-events: none;
      width: 100%;
      height: 100%;
      border: 2px solid white;
    }
  }
  .canvas {
    flex: 1;
    canvas {
      margin-left: 10px;
      height: 80px;
      width: 2000px;
      background-color: #393d40;
    }
  }
}
</style>
