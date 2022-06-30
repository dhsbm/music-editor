<!-- 头部控制栏 -->
<template>
  <div class="headerControlBar">
    <button
      class="puyin menu"
      @click="masterMenuData.show = true"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '主菜单')"
    >
      &#xe62c;
    </button>
    <button
      class="puyin"
      :class="mode == Mode.Select ? 'active' : ''"
      @click="mode = Mode.Select"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '指针工具')"
    >
      &#xe645;
    </button>
    <button
      class="puyin"
      :class="mode == Mode.Add ? 'active' : ''"
      @click="mode = Mode.Add"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '铅笔工具')"
    >
      &#xe61b;
    </button>
    <button
      class="puyin"
      :class="mode == Mode.Tailor ? 'active' : ''"
      @click="mode = Mode.Tailor"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '剪刀工具')"
    >
      &#xe600;
    </button>
    <button
      class="puyin"
      :class="mode == Mode.Delete ? 'active' : ''"
      @click="mode = Mode.Delete"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '删除工具')"
    >
      &#xec7b;
    </button>
    <div class="line"></div>
    <button
      class="puyin"
      @click="undo(true)"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '撤销')"
    >
      &#xe659;
    </button>
    <button
      class="puyin"
      @click="redo(true)"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '重做')"
    >
      &#xe65a;
    </button>
    <div
      class="time"
      @click="timeData.showPat = !timeData.showPat"
      @mouseenter="showHoverPrompt($event, '切换 时间/节拍')"
      @mouseleave="hideHoverPrompt"
    >
      {{ timeData.displayTime }}
    </div>
    <div
      class="bpmBox"
      @mousewheel="changeBpm"
      @mouseenter="showHoverPrompt($event, '滚动修改节拍')"
      @mouseleave="hideHoverPrompt"
    >
      <input v-model.number="bpm" type="number" disabled />
      <div class="bpm">bpm</div>
      <div class="btns">
        <div class="add" @click="bpm < 500 && bpm++"></div>
        <div class="sub" @click="bpm > 20 && bpm--"></div>
      </div>
    </div>
    <div
      class="sigBox"
      @mousewheel="changeWorkerSig"
      @mouseenter="showHoverPrompt($event, '滚动修改量化')"
      @mouseleave="hideHoverPrompt"
      @click="changeWorkerSig($event as WheelEvent, true)"
    >
      <span>4/</span>
      <input type="number" :value="workerSig" disabled />
      <div class="sig">sig</div>
    </div>
    <button
      class="puyin"
      @click="workerCanvasData.leftBeat = editorCanvasData.leftBeat = indicatorData.start = 0"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '跳到开头')"
    >
      &#xe603;
    </button>
    <button
      class="puyin"
      :class="timeData.playing ? 'active' : ''"
      @click="play"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '播放')"
    >
      &#xe87c;
    </button>
    <button
      class="puyin"
      :class="timeData.cycle ? 'active' : ''"
      @click="timeData.cycle = !timeData.cycle"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '循环 开/关')"
    >
      &#xe648;
    </button>
    <button
      class="puyin"
      :class="timeData.metronome ? 'active' : ''"
      @click="timeData.metronome = !timeData.metronome"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '节拍器 开/关')"
    >
      &#xe602;
    </button>
    <div class="filler"></div>
    <button
      class="puyin"
      @click="contentEditorData.show = !contentEditorData.show"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '音谱编辑器')"
    >
      &#xe621;
    </button>
    <button
      class="puyin"
      @click="keyboardData.show = !keyboardData.show"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '钢琴键盘')"
    >
      &#xe60b;
    </button>
    <button
      class="puyin"
      @click="historyData.show = !historyData.show"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '历史记录')"
    >
      &#xe709;
    </button>
    <button
      class="puyin"
      @click="libraryData.show = !libraryData.show"
      @mouseleave="hideHoverPrompt"
      @mouseenter="showHoverPrompt($event, '素材库')"
    >
      &#xe620;
    </button>
    <button class="puyin login" :style="userButtonData.style" @click="showUserMenu">&#xe6bc;</button>
  </div>
</template>

<script setup lang="ts">
import { masterMenuData } from 'modules/masterMenu'
import { libraryData } from 'modules/library'
import { workerSig, bpm, timeData, play, changeBpm, changeWorkerSig } from 'modules/time'
import { userButtonData, showUserMenu } from 'modules/user'
import { historyData, undo, redo } from 'modules/history'
import { workerCanvasData, editorCanvasData } from 'modules/canvas'
import { contentEditorData } from 'modules/pattern'
import { showHoverPrompt, hideHoverPrompt } from 'modules/prompt'
import { indicatorData } from 'modules/indicator'
import { keyboardData } from 'modules/pianoKeyboard'
import { mode } from 'modules/globalData'
import { Mode } from 'modules/globalData/Interface'
</script>

<style lang="scss" scoped>
/* 头部工具栏样式 */
.headerControlBar {
  display: flex;
  text-align: center;
  height: 50px;
  color: #e5e5e5;
  background-color: #31353a;
  justify-content: center;
  align-items: center;

  .menu {
    margin: 0;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    color: #eeeeee;
    background-color: rgb(64, 228, 212);

    &:hover {
      color: #ffffff;
      background-color: rgb(68, 255, 236);
    }
  }

  button {
    color: rgb(172, 162, 162);
    margin: 3px 0;
    width: 42px;
    height: 42px;
    font-size: 18px;
    text-align: center;
    background-color: transparent;
    border: none;
    margin: 0 1px;

    &:hover {
      color: #ffffff;
      background-color: #121416;
    }
  }

  .line {
    height: 40px;
    width: 1.5px;
    background-color: #858585;
    margin: 0 10px;
  }

  .time {
    width: 146px;
    height: 42px;
    font-size: 26px;
    line-height: 42px;
    color: rgb(64, 228, 212);
    background-color: #2a2d31;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    margin-left: 10px;
    padding: 0 10px;
    text-align: right;
  }

  .bpmBox {
    width: 120px;
    height: 42px;
    color: rgb(64, 228, 212);
    background-color: #2a2d31;
    border-right: 1px solid rgba(255, 255, 255, 0.1);

    input[type='number'] {
      -webkit-appearance: none;
      /*Removes default chrome and safari style*/
      -moz-appearance: none;
      /*Removes default style Firefox*/
      background-color: transparent;
      border: none;
      outline: none;
      text-align: left;
      font-size: 26px;
      line-height: 42px;
      width: 50px;
      color: rgb(64, 228, 212);

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    .bpm {
      display: inline;
      font-size: 12px;
    }

    .btns {
      margin-left: 5px;
      display: inline-block;
      width: 20px;
      align-items: center;
      vertical-align: bottom;

      .add {
        position: relative;
        height: 21px;

        &::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 15px;
          background-color: rgb(64, 228, 212);
          left: 0;
          top: 0;
          clip-path: polygon(20% 90%, 50% 50%, 80% 90%);
          -webkit-clip-path: polygon(20% 90%, 50% 50%, 80% 90%);
        }

        &:hover {
          background: black;
        }
      }

      .sub {
        position: relative;
        height: 21px;

        &::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 15px;
          background-color: rgb(64, 228, 212);
          left: 0;
          bottom: 0;
          clip-path: polygon(20% 10%, 50% 50%, 80% 10%);
          -webkit-clip-path: polygon(20% 10%, 50% 50%, 80% 10%);
        }

        &:hover {
          background: black;
        }
      }
    }
  }

  .sigBox {
    width: 120px;
    height: 42px;
    color: rgb(64, 228, 212);
    background-color: #2a2d31;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    margin-right: 10px;

    span {
      display: inline-block;
      font-size: 26px;
      line-height: 42px;
    }

    input[type='number'] {
      -webkit-appearance: none;
      /*Removes default chrome and safari style*/
      -moz-appearance: none;
      /*Removes default style Firefox*/
      background-color: transparent;
      border: none;
      outline: none;
      text-align: left;
      font-size: 26px;
      line-height: 42px;
      width: 50px;
      color: rgb(64, 228, 212);

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }

    .sig {
      display: inline;
      vertical-align: bottom;
      font-size: 12px;
    }
  }

  .filler {
    flex: 1;
  }

  .login {
    width: 50px;
    height: 50px;
    font-size: 27px;
    color: rgb(64, 228, 212);
    margin-right: 10px;

    &:hover {
      color: rgb(0, 255, 229);
      background-color: transparent;
    }
  }

  .active {
    color: #ffffff;
    background-color: #121416;
  }
}
</style>
