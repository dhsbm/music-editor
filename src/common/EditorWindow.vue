<!-- 包络节点编辑器 -->
<template>
  <div class="editorWindow" :style="editorData.style" @mousedown="changeZIndex(editorData.style)">
    <slot name="title"></slot>
    <div v-if="editorData.clone" class="content">
      <div class="container">
        <slot name="settings"></slot>
      </div>
      <div class="save">
        <button @click="saveFun">保存</button>
      </div>
    </div>
    <div v-else class="content">
      <div class="tip">{{ tips }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { changeZIndex } from 'modules/tools'

defineProps<{
  editorData: {
    style: any
    clone?: any
  }
  tips: string
  saveFun: () => void
}>()
</script>

<style lang="scss" scoped>
@import '@/scss/middle.scss';
@import '@/scss/button.scss';
@import '@/scss/window.scss';

.editorWindow {
  @include middle();
  @include window-shadow();
  width: 280px;
  background: $window-background-color;
  border-radius: 5px;
  z-index: 9999;
  .content {
    .container {
      padding-left: 10px;
      margin: 20px 0;
      font-size: 14px;
    }
    .save {
      text-align: end;
      padding-right: 20px;
      padding-bottom: 10px;

      button {
        @include transparent-button();
      }
    }
    .tip {
      padding: 80px 50px;
      text-align: center;
    }
  }
}
</style>
