<!-- 包络菜单 -->
<template>
  <div
    v-show="envelopeMenuData.show"
    class="envelopeMenu"
    :style="envelopeMenuData.style"
    @contextmenu="$event.preventDefault()"
  >
    <div @mousedown="showEnvelopeEditor(getActiveEnvelope())">编辑包络参数</div>
    <div @mousedown="selectSimilarEnvelope(getActiveEnvelope())">选中所有同源包络</div>
    <div @mousedown="independEnvelope(getActiveEnvelope())">独立包络数据</div>
    <div @mousedown="deleteSelectedEnvelope">删除选定包络</div>
  </div>
</template>

<script setup lang="ts">
import {
  envelopeMenuData,
  hideEnvelopeMenu,
  deleteSelectedEnvelope,
  showEnvelopeEditor,
  getActiveEnvelope,
  selectSimilarEnvelope,
  independEnvelope,
} from 'modules/envelope'

document.addEventListener('mousedown', () => {
  hideEnvelopeMenu()
})
</script>

<style lang="scss" scoped>
.envelopeMenu {
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
