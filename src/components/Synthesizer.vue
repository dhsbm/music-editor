<!-- 合成器 -->
<template>
  <div
    v-if="synthesizerData.show"
    class="synthesizer"
    :style="synthesizerData.style"
    @mousedown="changeZIndex(synthesizerData.style)"
  >
    <Title :data="synthesizerData" title="音源合成器" :close="hideSynthesizer" :start="true"></Title>
    <div v-if="synthesizerData.track" class="content">
      <div class="container">
        <p>各种设置 todos</p>
        <Knob v-model:value="value"></Knob>
      </div>
      <div class="save">
        <button>保存</button>
      </div>
    </div>
    <div v-else class="content">
      <div class="tip">请右键绑定音轨</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from 'common/Knob.vue'
import Title from 'common/Title.vue'
import { synthesizerData, hideSynthesizer } from 'modules/synthesizer'
import { changeZIndex } from 'modules/tools'
import { watch, ref } from 'vue'
const value = ref(5)
watch(value, (now, pre) => {
  console.log('value数据改变了', now, pre)
})
console.log(value.value)
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/button.scss';
@import 'scss/window.scss';
.synthesizer {
  @include middle();
  @include window-shadow();
  width: 500px;
  height: 400px;
  background: $window-background-color;
  border-radius: 5px;
  z-index: 9999;
  .content {
    .container {
      padding: 80px 50px;
      text-align: center;
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
