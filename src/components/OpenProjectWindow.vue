<template>
  <div
    v-show="switchProjectWindowData.show"
    class="openProject"
    :style="switchProjectWindowData.style"
    @mousedown="changeZIndex(switchProjectWindowData.style)"
  >
    <Title
      :data="switchProjectWindowData"
      name="打开项目"
      :close="() => (switchProjectWindowData.show = false)"
    ></Title>
    <div class="content">
      <div
        v-for="(project, index) in switchProjectWindowData.projectList"
        :key="project.projectId"
        class="projectItem"
        :class="switchProjectWindowData.select == index ? 'active' : ''"
        @click="switchProjectWindowData.select = index"
      >
        {{ project.title }}
      </div>
      <div
        v-for="(project, index) in switchProjectWindowData.projectList"
        :key="project.projectId"
        class="projectItem"
        :class="switchProjectWindowData.select == index ? 'active' : ''"
        @click="switchProjectWindowData.select = index"
      >
        {{ project.title }}
      </div>
    </div>
    <div class="bottom">
      <button @click="switchProject(switchProjectWindowData.select)">确认打开</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './tools/Title.vue'
import { changeZIndex } from 'modules/tools'
import { switchProjectWindowData, switchProject } from 'modules/project'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/window.scss';
@import 'scss/scrollbar.scss';
@import 'scss/button.scss';

// 打开项目
.openProject {
  @include middle();
  @include window-shadow();
  width: 500px;
  height: 280px;
  background: $window-background-color;
  z-index: 4;
  .content {
    height: 200px;
    overflow-y: scroll;
    @include scrollbar();
    .projectItem {
      background-color: rgba(0, 0, 0, 0.2);
      padding-left: 6px;
      border-radius: 3px;
      line-height: 20px;
      font-size: 13px;
      margin: 1px 0;
    }
    .active {
      background-color: rgba(35, 53, 250, 0.8);
    }
  }
  .bottom {
    text-align: end;
    padding-right: 20px;
    padding-top: 10px;
    button {
      @include transparent-button();
    }
  }
}
</style>
