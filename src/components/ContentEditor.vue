<!-- 音谱内容编辑器 -->
<template>
  <div
    v-show="contentEditorData.show"
    class="contentEditor"
    :style="contentEditorData.style"
    @mousedown="changeZIndex(contentEditorData.style)"
  >
    <!-- 上下左右拉伸 -->
    <Resize :data="contentEditorData"></Resize>

    <!-- 标题 -->
    <Title
      v-model:large="contentEditorData.large"
      :data="contentEditorData"
      name="音谱内容编辑器"
      :close="hideContentEditor"
      :start="true"
      :enlarge="true"
    ></Title>

    <!-- 内容区 -->
    <div v-show="contentEditorData.pattern" class="content">
      <div class="contentSettings">
        <div class="selectSetting">
          <span class="name">量化</span>
          <select v-model="editorSig">
            <option v-for="sig in sigList" :key="sig" :value="sig">4/{{ sig }}</option>
          </select>
        </div>
      </div>
      <!-- 钢琴编辑区 -->
      <div class="contentEdit">
        <div class="piano">
          <canvas ref="editorPianoCanvas" :style="editorPianoCanvasData.style" @mousedown="pressPiano"></canvas>
        </div>
        <div class="editorCanvasHeader">
          <HeaderCanvas
            :left-beat="editorCanvasData.leftBeat"
            :beat-width="editorCanvasData.beatWidth"
            :sig="editorSig"
          >
          </HeaderCanvas>
          <!-- 指针 -->
          <Indicator :left-beat="editorCanvasData.leftBeat" :beat-width="editorCanvasData.beatWidth"></Indicator>
          <!-- 音谱遮罩层 -->
          <div class="overlay" :style="contentEditorData.overlayStyle">
            <div class="head" :style="contentEditorData.overlayHeaderStyle"></div>
            <div class="screen"></div>
          </div>
        </div>
        <div class="editorArea">
          <!-- 全屏浅黑黑幕 -->
          <Shady></Shady>
          <!-- 选择框 -->
          <div class="select" :style="editorCanvasData.selectBoxStyle"></div>
          <!-- 裁剪竖线 -->
          <CutLine :cut-line-style="editorCanvasData.cutLineStyle"></CutLine>
          <canvas
            ref="editorCanvas"
            :style="editorCanvasData.style"
            contenteditable
            @contextmenu="$event.preventDefault()"
            @dblclick="dblclickEditorCanvas"
            @mousedown="mousedownEditorCanvas"
            @mousemove="mousemoveEditorCanvas"
            @mouseleave="mouseleaveEditorCanvas"
            @mousewheel="rollCanvas($event, editorCanvasData)"
            @keydown="keydownEditorCanvas"
          ></canvas>
        </div>
        <CanvasScrollbar :canvas-data="editorCanvasData"></CanvasScrollbar>
        <div class="cover1"></div>
        <div class="cover2"></div>
      </div>
    </div>
    <div v-show="!contentEditorData.pattern" class="content">
      <div class="tip">双击音谱并编辑内容</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderCanvas from 'common/HeaderCanvas.vue'
import Indicator from 'common/Indicator.vue'
import Resize from 'common/Resize.vue'
import Title from 'common/Title.vue'
import CanvasScrollbar from 'common/CanvasScrollbar.vue'
import Shady from 'common/Shady.vue'
import CutLine from 'common/CutLine.vue'
import { changeZIndex } from 'modules/tools'
import { editorSig, sigList } from 'modules/time'
import { contentEditorData, hideContentEditor } from 'modules/pattern'
import {
  editorPianoCanvasData,
  editorCanvasData,
  dblclickEditorCanvas,
  mouseleaveEditorCanvas,
  mousemoveEditorCanvas,
  mousedownEditorCanvas,
  keydownEditorCanvas,
  pressPiano,
  rollCanvas,
} from 'modules/canvas'
import { getCurrentInstance, onMounted } from 'vue'
const vm = getCurrentInstance()
onMounted(() => {
  const editorCanvas = vm!.refs.editorCanvas as HTMLCanvasElement
  editorCanvasData.canvas = editorCanvas
  editorCanvasData.ctx = editorCanvas.getContext('2d')!
  editorCanvas.width = 2000
  editorCanvas.height = 900

  const editorPianoCanvas = vm!.refs.editorPianoCanvas as HTMLCanvasElement
  editorPianoCanvasData.canvas = editorPianoCanvas
  editorPianoCanvasData.ctx = editorPianoCanvas.getContext('2d')!
  editorPianoCanvas.width = 60
  editorPianoCanvas.height = editorCanvasData.totalRows * 16
})
</script>

<style lang="scss" scoped>
@import 'scss/window.scss';
@import 'scss/middle.scss';
@import 'scss/scrollbar.scss';

// 内容编辑器样式
.contentEditor {
  @include middle();
  @include window-shadow();
  height: 600px;
  width: 1100px;
  background-color: $window-background-color;
  min-width: 600px;
  min-height: 200px;

  .content {
    display: flex;
    height: calc(100% - 30px);

    .contentSettings {
      width: 120px;
      flex-shrink: 0;
      padding-top: 50px;
      border-right: 1px solid #000;

      .selectSetting {
        margin-bottom: 10px;
        height: 20px;
        font-size: 14px;
        padding-left: 2px;

        .name {
          display: inline-block;
          box-sizing: border-box;
          width: 40px;
          height: 20px;
          vertical-align: bottom;
          text-align: center;
          line-height: 20px;
          border: none;
        }

        select {
          box-sizing: border-box;
          height: 20px;
          width: 70px;
          border: none;
          background: rgb(49, 47, 47);
          color: rgb(172, 162, 162);

          option {
            background: transparent;
            color: rgb(172, 162, 162);

            &:hover {
              color: #ffffff;
              background-color: #121416;
            }
          }

          &:hover {
            color: #ffffff;
            background-color: #121416;
          }
        }
      }
    }

    .contentEdit {
      background-color: #292d31;
      overflow: hidden;
      display: grid;
      grid-template-columns: 60px 1fr 132px 14px;
      grid-template-rows: 30px 1fr 102px 14px;
      gap: 0px 0px;
      grid-auto-flow: row;
      grid-template-areas:
        'cover1 pianoCanvasHeader pianoCanvasHeader pianoCanvasHeader'
        'piano editorArea editorArea verticalMoveScrollbar'
        'piano editorArea editorArea verticalStretchScrollbar'
        'cover2 horizontalMoveScrollbar horizontalStretchScrollbar .';

      .piano {
        grid-area: piano;
        overflow: hidden;
        position: relative;
        z-index: 4;
      }

      .editorCanvasHeader {
        position: relative;
        grid-area: pianoCanvasHeader;

        .overlay {
          width: 200px;
          position: absolute;
          pointer-events: none;
          left: 10px;
          top: 0;
          z-index: 2;
          opacity: 0.2;

          .head {
            height: 30px;
          }

          .screen {
            height: 900px;
            background-color: rgb(255, 255, 255);
          }
        }
      }

      .editorArea {
        position: relative;
        overflow: hidden;
        grid-area: editorArea;

        .select {
          position: absolute;
          outline: 1px solid rgb(255, 255, 255);
        }

        canvas {
          margin-left: 10px;
          height: 900px;
          width: 2000px;
          background-color: #393d40;
          outline: 0;
        }
      }

      .cover1,
      .cover2 {
        grid-area: cover1;
        position: relative;
        z-index: 5;
        background-color: #292d31;
      }

      .cover2 {
        grid-area: cover2;
      }
    }

    .tip {
      align-self: center;
      color: #b6aaaa;
      margin: 0 auto;
      font-size: 36px;
      font-weight: 600;
    }
  }
}
</style>
