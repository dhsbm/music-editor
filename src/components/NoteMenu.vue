<!-- 音节菜单 -->
<template>
  <div v-show="noteMenuData.show" class="noteMenu" :style="noteMenuData.style" @contextmenu="$event.preventDefault()">
    <div @mousedown="deleteSelectedNote">删除选定音节</div>
  </div>
</template>

<script setup lang="ts">
import { noteMenuData, hideNoteMenu, deleteSelectedNote } from 'modules/note'

// 关闭菜单
document.addEventListener('mousedown', () => {
  hideNoteMenu()
})
</script>

<style lang="scss" scoped>
.noteMenu {
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
