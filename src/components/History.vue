<!-- 历史记录 -->
<template>
  <div
    v-show="historyData.show"
    class="history"
    :style="historyData.style"
    @mousedown="changeZIndex(historyData.style)"
  >
    <Title :data="historyData" title="历史记录" :close="() => (historyData.show = false)" :small="true"></Title>
    <div ref="historyContainer" class="content">
      <div class="historyList">
        <div
          v-for="i in historyData.lastIndex + 1"
          :key="i"
          class="historyItem"
          :class="historyItemClass(i - 1)"
          @click="changeHistoryIndex(i - 1)"
        >
          {{ historyList[i - 1].describe }}
        </div>
      </div>
    </div>
    <div class="bottom">
      <button class="puyin delete" @click="historyData.lastIndex = historyData.index">&#xec7b;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { historyData, historyList, historyItemClass, changeHistoryIndex } from 'modules/history'
import { changeZIndex } from 'modules/tools'
import { getCurrentInstance, onMounted } from 'vue'

const vm = getCurrentInstance()
onMounted(() => {
  historyData.historyContainer = vm!.refs.historyContainer as HTMLElement
})
</script>

<style lang="scss" scoped>
@import 'scss/window.scss';
@import 'scss/scrollbar.scss';
// 历史记录样式
.history {
  @include window-shadow();
  z-index: 5;
  position: absolute;
  right: 12px;
  top: 60px;
  width: 230px;
  height: 300px;
  background: $window-background-color;
  .content {
    height: 260px;
    overflow-y: scroll;
    background: transparent;
    @include scrollbar();
    .historyList {
      border-right: 1px solid black;
      .historyItem {
        margin: 1px;
        padding-left: 5px;
        color: rgb(255, 255, 255);
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        outline: 1px solid rgb(32, 31, 31);
        border-radius: 5px;
      }
      .activated {
        background: rgb(85, 81, 81);
      }
      .active {
        background: rgb(56, 53, 53);
      }
      .will {
        background: rgb(150, 144, 144);
      }
    }
  }
  .bottom {
    height: 20px;
    background-color: #353a3f;
    .delete {
      position: absolute;
      right: 20px;
      background-color: transparent;
      color: #b6aaaa;
      border: none;
      float: right;
      font-size: 12px;
      line-height: 20px;
      width: 20px;
      height: 20px;
      &:hover {
        background-color: rgb(30, 31, 34);
      }
    }
  }
}
</style>
