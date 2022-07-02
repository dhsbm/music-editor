<!-- 意见反馈 -->
<template>
  <div
    v-if="feedbackData.show"
    class="feedback window"
    :style="feedbackData.style"
    @mousedown="changeZIndex(feedbackData.style)"
  >
    <Title :data="feedbackData" title="使用反馈" :close="() => (feedbackData.show = false)"></Title>
    <div class="content">
      <div>
        <p>主题</p>
        <select>
          <option>漏洞</option>
          <option selected>建议</option>
          <option>其他</option>
        </select>
      </div>
      <div>
        <p>反馈</p>
        <textarea></textarea>
      </div>
    </div>
    <div class="bottom">
      <button>发送反馈</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { changeZIndex } from 'modules/tools'
import { feedbackData } from 'modules/feedback'
</script>

<style lang="scss" scoped>
@import 'scss/window.scss';
@import 'scss/middle.scss';
@import 'scss/button.scss';
@import 'scss/scrollbar.scss';

// 意见反馈
.feedback {
  @include middle();
  @include window-shadow();
  width: 380px;
  height: 320px;
  background: $window-background-color;
  z-index: 4;
  .content {
    padding: 10px;
    font-size: 14px;
    p {
      margin: 4px 0;
      padding-left: 3px;
    }
    select {
      box-sizing: border-box;
      height: 20px;
      width: 100%;
      border: none;
      background: rgb(49, 47, 47);
      color: rgb(172, 162, 162);
      option {
        background: transparent;
        color: rgb(172, 162, 162);
        &:hover {
          color: #ffffff;
          background-color: #121416;
        }
      }
      &:hover {
        color: #ffffff;
        background-color: #121416;
      }
    }
    textarea {
      -webkit-appearance: none;
      resize: none;
      display: inline-block;
      box-sizing: border-box;
      width: 360px;
      height: 150px;
      border: none;
      border-radius: 0;
      color: #fff8de;
      background: rgba(0, 0, 0, 0.3);
      box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
      padding: 5px;
      font-size: 12px;
      @include scrollbar();
    }
  }
  .bottom {
    text-align: end;
    padding-right: 10px;
    button {
      @include transparent-button();
    }
  }
}
</style>
