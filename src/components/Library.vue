<template>
  <!-- 素材库 -->
  <div
    v-show="libraryData.show"
    class="library"
    :style="libraryData.style"
    @mousedown="changeZIndex(libraryData.style)"
  >
    <Title :data="libraryData" name="音频素材库" :close="() => (libraryData.show = false)"></Title>
    <div class="search">
      <span class="puyin">&#xe7b7;</span>
      <input type="search" placeholder="搜索" />
    </div>
    <div class="contentHeader">
      <span>名字</span>
      <span>节拍</span>
      <span>调号</span>
    </div>
    <div class="content">
      <div
        v-for="item in libraryData.shownLibraryList"
        :key="item.id"
        class="item"
        :style="`padding-left:${item.level * 10}px;`"
        :draggable="!!item.data"
        @click="switchFolder(item.id)"
        @dragstart="dragLibraryItem(item.id)"
      >
        <span class="puyin" v-html="libraryItemIcons[item.type]"></span>
        <span>{{ item.text }}</span>
        <span>{{ item.rhythm }}</span>
        <span>{{ item.tone }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { libraryData, dragLibraryItem, switchFolder, libraryItemIcons } from 'modules/library'
import { changeZIndex } from 'modules/tools'
</script>

<style lang="scss" scoped>
@import 'scss/window.scss';
@import 'scss/middle.scss';
@import 'scss/scrollbar.scss';
/* 素材库样式 */
.library {
  @include middle();
  @include window-shadow();
  width: 300px;
  height: 600px;
  background: $window-background-color;
  .search {
    height: 26px;
    padding: 4px 6px;
    display: flex;
    align-items: center;
    background-color: rgb(65, 69, 78);
    span {
      margin-right: 14px;
    }
    input {
      flex: 1;
      background-color: transparent;
      border: none;
      color: white;
      &:focus {
        outline: 0;
      }
    }
  }
  .contentHeader {
    display: flex;
    height: 24px;
    padding: 2px 10px;
    font-size: 12px;
    color: rgb(106, 99, 99);
    background: black;
    span:nth-child(1) {
      flex: 1;
    }
    span:nth-child(2) {
      width: 30px;
      margin-right: 4px;
    }
    span:nth-child(3) {
      width: 30px;
    }
  }
  .content {
    color: rgb(37, 34, 34);
    background-color: rgb(109, 116, 130);
    height: 520px;
    padding: 2px 10px;
    font-size: 14px;
    .item {
      display: flex;
      span:nth-child(1) {
        align-self: center;
        width: 14px;
      }
      span:nth-child(2) {
        flex: 1;
      }
      span:nth-child(3) {
        text-align: center;
        width: 30px;
        margin-right: 4px;
      }
      span:nth-child(4) {
        text-align: center;
        width: 30px;
      }
    }
  }
}
</style>
