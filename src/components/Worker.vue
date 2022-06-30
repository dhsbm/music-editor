<!-- 中央工作区 -->
<template>
  <div class="worker">
    <!-- 侧边声轨 -->
    <div class="soundTrack">
      <div class="soundTrackContainer">
        <div
          class="trackList"
          :style="workerCanvasData.containerTracksStyle"
          @contextmenu="$event.preventDefault()"
          @mousedown="mousedownTrackList"
          @dblclick="mousedownTrackList($event, true)"
          @mouseover="mouseoverTrackList"
          @mouseout="mouseoutTrackList"
        >
          <TrackItem
            v-for="item in trackData.sortedTrackData"
            :key="item.trackId"
            v-model:volume="item.volume"
            :track="item"
            :height="workerCanvasData.beatHeight"
            :selected="item == trackData.selectedTrack"
          ></TrackItem>
        </div>
        <button class="addButton" @click="addTrack(true)">
          <p>+</p>
          <p>添加声轨</p>
        </button>
      </div>
    </div>
    <!-- 编辑区 -->
    <div class="edit">
      <div class="canvasHeader">
        <HeaderCanvas
          :left-beat="workerCanvasData.leftBeat"
          :beat-width="workerCanvasData.beatWidth"
          :sig="workerSig"
        ></HeaderCanvas>
        <!-- 指针 -->
        <Indicator :left-beat="workerCanvasData.leftBeat" :beat-width="workerCanvasData.beatWidth"></Indicator>

        <!-- 上方循环遮罩层 -->
        <Overlay :beat-width="workerCanvasData.beatWidth"></Overlay>
      </div>
      <div ref="workerArea" class="workerArea">
        <!-- 全屏浅黑黑幕 -->
        <Shady></Shady>
        <!-- 裁剪竖线 -->
        <CutLine :cut-line-style="workerCanvasData.cutLineStyle"></CutLine>
        <!-- 选择框 -->
        <div class="select" :style="workerCanvasData.selectBoxStyle"></div>
        <!-- 小圆点 -->
        <div class="dot" :style="dotStyle"></div>
        <!-- 圆点数据提示 -->
        <div class="dotPrompt" :style="dotPromptData.style">{{ dotPromptData.content }}</div>
        <canvas
          ref="workerCanvas"
          :style="workerCanvasData.style"
          contenteditable
          @contextmenu="$event.preventDefault()"
          @dblclick="dblclickWorkerCanvas"
          @mousedown="mousedownWorkerCanvas"
          @mousemove="mousemoveWorkerCanvas"
          @mouseleave="mouseleaveWorkerCanvas"
          @mousewheel="rollCanvas($event, workerCanvasData)"
          @drop="dropLibraryItem"
          @keydown="keydownWorkerCanvas"
        ></canvas>
      </div>
      <!-- 边角处滑块 -->
      <CanvasScrollbar :canvas-data="workerCanvasData"></CanvasScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCanvas from 'common/HeaderCanvas.vue'
import Indicator from 'common/Indicator.vue'
import Overlay from 'common/Overlay.vue'
import CanvasScrollbar from 'common/CanvasScrollbar.vue'
import TrackItem from 'common/TrackItem.vue'
import Shady from 'common/Shady.vue'
import CutLine from 'common/CutLine.vue'

import { workerSig } from 'modules/time'
import { dropLibraryItem } from 'modules/library'
import { trackData, addTrack, mousedownTrackList, mouseoverTrackList, mouseoutTrackList } from 'modules/track'
import {
  workerCanvasData,
  dblclickWorkerCanvas,
  mouseleaveWorkerCanvas,
  mousemoveWorkerCanvas,
  mousedownWorkerCanvas,
  keydownWorkerCanvas,
  rollCanvas,
  workerCanvasRender,
} from 'modules/canvas'
import { dotStyle, dotPromptData } from 'modules/dot'
import { onMounted, getCurrentInstance } from 'vue'

onMounted(() => {
  const vm = getCurrentInstance()

  const init = () => {
    const workerArea = vm!.refs.workerArea as HTMLElement
    workerCanvasData.scrollbarStyle.width = workerArea.clientHeight - 108 + 'px'
    workerCanvasData.editAreaHeight = workerArea.clientHeight
    workerCanvasData.editAreaWidth = workerArea.clientWidth
    workerCanvasRender()
  }
  window.onresize = () => {
    init()
  }
  const workerCanvas = vm!.refs.workerCanvas as HTMLCanvasElement
  workerCanvasData.canvas = workerCanvas
  workerCanvasData.ctx = workerCanvas.getContext('2d')!
  workerCanvas.width = 2000
  workerCanvas.height = 900

  init()
})
</script>

<style lang="scss" scoped>
@import 'scss/scrollbar.scss';
// 工作区样式
.worker {
  height: calc(100vh - 50px);
  max-height: 900px;
  display: flex;
  background-color: #292d31;
  overflow: hidden;
  // 侧边音轨
  .soundTrack {
    padding-top: 30px;
    width: 140px;
    height: 100%;
    flex-shrink: 0;
    background-color: rgb(105, 102, 94);

    .soundTrackContainer {
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .trackList {
        overflow: hidden;
        margin-top: 0;
        flex-shrink: 0;
      }
      .addButton {
        flex-shrink: 0;
        width: 100%;
        height: 70px;
        background-color: rgb(79, 75, 75);
        border: 0;
        text-align: center;
        &:hover {
          background-color: rgb(106, 99, 99);
        }
        p:nth-child(1) {
          font-size: 30px;
          line-height: 30px;
        }
        p:nth-child(2) {
          font-size: 14px;
          line-height: 16px;
        }
      }
    }
  }
  // 编辑区
  .edit {
    position: relative;
    width: calc(100% - 140px);
    flex: 1;
    height: 100%;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 132px 14px;
    grid-template-rows: 30px 1fr 102px 14px;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      'canvasHeader canvasHeader canvasHeader'
      'workerArea workerArea verticalMoveScrollbar'
      'workerArea workerArea verticalStretchScrollbar'
      'horizontalMoveScrollbar horizontalStretchScrollbar .';

    .canvasHeader {
      position: relative;
      grid-area: canvasHeader;
    }
    .workerArea {
      position: relative;
      grid-area: workerArea;

      .select {
        position: absolute;
        outline: 1px solid rgb(255, 255, 255);
      }

      .dot {
        position: absolute;
        width: 8px;
        height: 8px;
        transform: translate(-4px, -4px);
        border-radius: 50%;
        background-color: white;
        pointer-events: none;
      }
      .dotPrompt {
        position: absolute;
        padding: 3px;
        font-size: 10px;
        transform: translateX(-50%);
        color: white;
        background-color: black;
        pointer-events: none;
        z-index: 99999;
        &::after {
          content: '';
          position: absolute;
          background-color: black;
          width: 10px;
          height: 5px;
          left: 50%;
          bottom: -5px;
          transform: translateX(-50%);

          clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
        }
      }
      canvas {
        margin-left: 10px;
        height: 900px;
        width: 2000px;
        background-color: #393d40;
        outline: 0; // 这里是为了清除可编辑状态下的轮廓
        cursor: default;
      }
    }
  }
}
</style>
