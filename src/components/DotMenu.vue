<!-- 包络节点菜单 -->
<template>
  <div v-show="dotMenuData.show" class="dotMenu" :style="dotMenuData.style" @contextmenu="$event.preventDefault()">
    <div @mousedown="showDotEditor(getActiveDot())">编辑节点参数</div>
    <div @mousedown="deleteSelectedDot">删除选定节点</div>
  </div>
</template>

<script setup lang="ts">
import { dotMenuData, hideDotMenu, deleteSelectedDot, showDotEditor, getActiveDot } from 'modules/dot'

// 关闭菜单
document.addEventListener('mousedown', () => {
  hideDotMenu()
})
</script>

<style lang="scss" scoped>
.dotMenu {
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
