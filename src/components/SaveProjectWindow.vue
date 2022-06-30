<!-- 保存项目 -->
<template>
  <div
    v-if="saveProjectWindowData.show"
    class="saveProject"
    :style="saveProjectWindowData.style"
    @mousedown="changeZIndex(saveProjectWindowData.style)"
  >
    <Title :data="saveProjectWindowData" name="保存项目" :close="() => (saveProjectWindowData.show = false)"></Title>
    <div class="content">
      <div>
        <p>项目名称</p>
        <input v-model="saveProjectWindowData.title" type="text" />
      </div>
      <div>
        <p>项目介绍</p>
        <textarea v-model="saveProjectWindowData.introduce"></textarea>
      </div>
    </div>
    <div class="bottom">
      <button @click="saveAsProject">确认保存</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { changeZIndex } from 'modules/tools'
import { saveProjectWindowData, saveAsProject } from 'modules/project'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/window.scss';
@import 'scss/scrollbar.scss';
@import 'scss/button.scss';

// 保存项目
.saveProject {
  @include middle();
  @include window-shadow();
  width: 300px;
  height: 240px;
  background: $window-background-color;
  z-index: 4;
  .content {
    padding: 10px;
    font-size: 14px;
    p {
      margin: 4px 0;
      padding-left: 3px;
    }
    input {
      width: 270px;
      border: none;
      color: #fff8de;
      padding: 2px 5px;
      font-size: 13px;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
    }
    textarea {
      -webkit-appearance: none;
      resize: none;
      display: inline-block;
      box-sizing: border-box;
      width: 280px;
      height: 70px;
      border: none;
      border-radius: 0;
      color: #fff8de;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
      padding: 5px;
      font-size: 12px;
      @include scrollbar();
    }
  }
  .bottom {
    text-align: end;
    padding-right: 10px;
    button {
      @include transparent-button();
    }
  }
}
</style>
