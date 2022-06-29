<template>
  <!-- 音谱菜单 -->
  <div
    v-show="patternMenuData.show"
    class="patternMenu"
    :style="patternMenuData.style"
    @contextmenu="$event.preventDefault()"
  >
    <div @mousedown="showContentEditor(getActivePattern())">编辑音谱内容</div>
    <div @mousedown="showPatternEditor(getActivePattern())">编辑音谱参数</div>
    <div @mousedown="selectSimilarPattern(getActivePattern())">选择所有同源音谱</div>
    <div @mousedown="independPattern(getActivePattern())">独立音谱数据</div>
    <div @mousedown="deleteSelectedPattern">删除选定音谱</div>
  </div>
</template>

<script setup lang="ts">
import {
  patternMenuData,
  hidePatternMenu,
  deleteSelectedPattern,
  showContentEditor,
  showPatternEditor,
  getActivePattern,
  selectSimilarPattern,
  independPattern,
} from 'modules/pattern'

document.addEventListener('mousedown', () => {
  hidePatternMenu()
})
</script>

<style lang="scss" scoped>
.patternMenu {
  position: absolute;
  width: 150px;
  background-color: white;
  z-index: 99999;
  div {
    padding-left: 20px;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    &:hover {
      background-color: rgb(188, 188, 188);
    }
  }
}
</style>
