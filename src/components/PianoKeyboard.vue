<!-- 钢琴键盘 -->
<template>
  <div
    v-show="keyboardData.show"
    class="keyboardWindow"
    :style="keyboardData.style"
    @mousedown="changeZIndex(keyboardData.style)"
  >
    <!-- 上下左右拉伸 -->
    <Resize :data="keyboardData"></Resize>
    <Title :data="keyboardData" title="键盘" :close="() => (keyboardData.show = false)" :start="true"></Title>

    <div class="pianoContainer">
      <div class="piano">
        <div class="settings">
          <div class="octaveSwitch">
            <p>八度</p>
            <button @click="changeOctave(-1)">-</button>
            <span>{{ keyboardData.octave + 1 }}</span>
            <button @click="changeOctave(1)">+</button>
          </div>
        </div>
        <div class="main">
          <canvas ref="keyboardCanvas" :style="keyboardData.canvasStyle" @mousedown="mousedownKeyboard"></canvas>
        </div>
        <div class="long">
          <input v-model="keyboardData.coverRatio" type="range" min="0.0" max="1.0" step="0.0000001" />
        </div>
        <div class="short">
          <input v-model="keyboardData.zoom" type="range" min="0.5" max="1.5" step="0.00001" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Resize from 'common/Resize.vue'
import Title from 'common/Title.vue'
import { getCurrentInstance, onMounted } from 'vue'
import { keyboardData, keyboardStaticData, changeOctave, mousedownKeyboard, initKeyboard } from 'modules/pianoKeyboard'
import { changeZIndex } from 'modules/tools'

const vm = getCurrentInstance()
onMounted(() => {
  keyboardStaticData.canvas = vm!.refs.keyboardCanvas as HTMLCanvasElement
  initKeyboard()
})
</script>

<style lang="scss" scoped>
@import 'scss/scrollbar.scss';
@import 'scss/window.scss';

// 钢琴键盘样式
.keyboardWindow {
  @include window-shadow();
  position: absolute;
  left: 50%;
  top: 50%;
  height: 242px;
  width: 1000px;
  min-width: 600px;
  min-height: 180px;
  max-height: 300px;
  transform: translate(-500px, -121px);

  .pianoContainer {
    height: calc(100% - 30px);
  }
  .piano {
    height: 100%;
    display: grid;
    grid-template-columns: 140px 1fr 100px;
    grid-template-rows: 1fr 12px;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      'settings mainContent mainContent'
      'settings long short';

    .settings {
      grid-area: settings;
      background: #282b2f;
      display: flex;
      align-items: center;
      justify-content: center;
      .octaveSwitch {
        color: #bfbbaa;
        text-align: center;
        p {
          font-size: 24px;
        }
        span {
          display: inline-block;
          text-align: center;
          width: 20px;
          margin: 0 8px;
          font-size: 22px;
        }
        button {
          color: #bfbbaa;
          font-size: 26px;
          border: none;
          background-color: transparent;
          &:hover {
            background-color: black;
            color: white;
          }
        }
      }
    }
    .main {
      grid-area: mainContent;
      overflow: hidden;
      canvas {
        height: 100%;
        width: 2750px;
        background: black;
        margin: 0;
      }
    }
    .long {
      grid-area: long;
      position: relative;
      input[type='range'] {
        @include input-scrollbar(100%, 12px, 100px);
      }
    }
    .short {
      grid-area: short;
      position: relative;
      input[type='range'] {
        @include input-scrollbar(100%, 12px, 12px);
      }
    }
  }
}
</style>
