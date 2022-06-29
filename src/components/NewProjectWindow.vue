<template>
  <!-- 新建项目 -->
  <div
    v-show="newProjectWindowData.show"
    class="newProject"
    :style="newProjectWindowData.style"
    @mousedown="changeZIndex(newProjectWindowData.style)"
  >
    <Title :data="newProjectWindowData" name="新建项目" :close="() => (newProjectWindowData.show = false)"></Title>
    <div class="content">
      <button @click="newProject(false)">
        <p>新项目</p>
        <p>创建一个空白项目</p>
      </button>
      <button @click="newProject(true)">
        <p>音乐灵感</p>
        <p>随机生成一个项目</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './tools/Title.vue'
import { changeZIndex } from 'modules/tools'
import { newProject, newProjectWindowData } from 'modules/project'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/window.scss';

// 新建项目
.newProject {
  @include middle();
  @include window-shadow();
  width: 300px;
  height: 174px;
  background: $window-background-color;
  z-index: 4;
  .content {
    padding: 5px;
    button {
      width: 100%;
      -webkit-appearance: none;
      border: 1px solid rgb(30, 28, 28);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 0;
      color: rgb(30, 28, 28);
      padding: 5px;
      margin: 5px 0;
      &:hover {
        color: white;
        border-color: white;
      }
      p {
        text-align: start;
      }
      p:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}
</style>
