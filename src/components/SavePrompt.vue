<!-- 保存提示 -->
<template>
  <div v-if="savePromptData.show" class="savePrompt">
    <p>您是否要保存修改 {{ globalData.project?.title }} ?</p>
    <div class="btns">
      <button @click="hideSavePrompt(true)">保存</button>
      <button @click="hideSavePrompt(false)">不保存</button>
      <button @click="savePromptData.show = false">取消</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { globalData } from 'modules/globalData'
import { savePromptData, hideSavePrompt } from 'modules/prompt'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
// 保存提示
.savePrompt {
  @include middle();
  z-index: 99998;
  width: 500px;
  padding: 20px 20px;
  background-color: #2a2d31;
  color: #99a1a9;
  font-weight: 500;
  p {
    margin-bottom: 10px;
  }
  .btns {
    text-align: end;
    button {
      -webkit-appearance: none;
      border: none;
      background-color: transparent;
      border-radius: 0;
      color: rgba(255, 255, 255, 0.5);
      box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
      height: 32px;
      margin-right: 20px;
      line-height: 32px;
      padding: 0 10px;
      font-size: 12px;
      &:hover {
        background-color: rgb(99, 93, 93);
      }
    }
  }
}
</style>
