<!-- 音轨菜单 -->
<template>
  <div
    v-show="trackMenuData.show"
    class="trackMenu"
    :style="trackMenuData.style"
    @contextmenu="$event.preventDefault()"
  >
    <div @mousedown="showTrackEditor(trackData.selectedTrack)">编辑音轨参数</div>
    <div @mousedown="showSourceEditor(trackData.selectedTrack)">修改音源参数</div>
    <div @mousedown="selectTrackItem(trackData.selectedTrack)">选择所有元素</div>
    <div @mousedown="addTrackEnvelope(trackData.selectedTrack)">添加包络</div>
    <div @mousedown="deleteTrack(trackData.selectedTrack.trackId)">删除音轨</div>
  </div>
</template>

<script setup lang="ts">
import { addTrackEnvelope } from 'modules/envelope'
import {
  hideTrackMenu,
  trackMenuData,
  trackData,
  deleteTrack,
  showTrackEditor,
  selectTrackItem,
  showSourceEditor,
} from 'modules/track'

document.addEventListener('mousedown', () => {
  hideTrackMenu()
})
</script>

<style lang="scss" scoped>
.trackMenu {
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
