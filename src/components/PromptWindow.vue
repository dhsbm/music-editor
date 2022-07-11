<!-- 保存提示 -->
<template>
  <div v-if="promptWindowData.show" class="promptWindow">
    <div class="container">
      <p>{{ promptWindowData.text }}</p>
      <div class="btns">
        <button v-show="promptWindowData.btn1" @click="hidePromptWindow(1)">{{ promptWindowData.btn1 }}</button>
        <button v-show="promptWindowData.btn2" @click="hidePromptWindow(2)">{{ promptWindowData.btn2 }}</button>
        <button v-show="promptWindowData.btn3" @click="hidePromptWindow(3)">{{ promptWindowData.btn3 }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { promptWindowData, hidePromptWindow } from 'modules/prompt'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
// 保存提示
.promptWindow {
  position: absolute;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .container {
    color: #99a1a9;
    font-weight: 500;
    @include middle();
    width: 500px;
    padding: 20px 20px;
    background-color: #2a2d31;
    p {
      margin-bottom: 10px;
    }
    .btns {
      text-align: end;
      button {
        -webkit-appearance: none;
        border: none;
        background-color: transparent;
        border-radius: 0;
        color: rgba(255, 255, 255, 0.5);
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
        height: 32px;
        margin-right: 20px;
        line-height: 32px;
        padding: 0 10px;
        font-size: 12px;
        &:hover {
          background-color: rgb(99, 93, 93);
        }
      }
    }
  }
}
</style>
