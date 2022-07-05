<!-- 合成器 -->
<template>
  <div
    v-if="sourceEditorData.show"
    class="sourceeditor"
    :style="sourceEditorData.style"
    @mousedown="changeZIndex(sourceEditorData.style)"
  >
    <Title :data="sourceEditorData" title="音源参数编辑器" :close="hideSourceEditor" :start="true"></Title>
    <div v-if="sourceEditorData.clone" class="content">
      <div class="container">
        <div class="knobCantainer">
          <div class="item">
            <Knob v-model:value="sourceEditorData.clone.attackTime" label="上升时间"></Knob>
          </div>
          <div class="item">
            <Knob v-model:value="sourceEditorData.clone.decayTime" label="衰退时间"></Knob>
          </div>
          <div class="item">
            <Knob v-model:value="sourceEditorData.clone.releaseTime" label="释放时间"></Knob>
          </div>
          <div class="item">
            <Knob v-model:value="sourceEditorData.clone.sustainLevel" label="保持水平"></Knob>
          </div>
        </div>
        <div class="selectSetting">
          <span class="name">音源波形:</span>
          <select v-model="sourceEditorData.clone.type">
            <option v-for="item in typeList" :key="item.value" :value="item.value">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="save">
        <button @click="saveSource">保存</button>
      </div>
    </div>
    <div v-else class="content">
      <div class="tip">请先绑定音源</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Knob from 'common/Knob.vue'
import Title from 'common/Title.vue'
import { sourceEditorData, hideSourceEditor, saveSource } from 'modules/track'
import { changeZIndex } from 'modules/tools'

const typeList = [
  { name: '正弦波', value: 'sine' },
  { name: '方波', value: 'square' },
  { name: '三角波', value: 'triangle' },
  { name: '锯齿波', value: 'sawtooth' },
]
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/button.scss';
@import 'scss/window.scss';
.sourceeditor {
  @include middle();
  @include window-shadow();
  width: 280px;
  background: $window-background-color;
  border-radius: 5px;
  z-index: 9999;
  .content {
    .container {
      .knobCantainer {
        padding: 0 30px;
        padding-top: 30px;
        text-align: center;
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 50%;
          margin-bottom: 10px;
        }
      }
      .selectSetting {
        margin: 20px auto;
        width: 180px;
        height: 24px;
        .name {
          display: inline-block;
          width: 80px;
          text-align: center;
          margin-right: 10px;
          height: 24px;
          line-height: 24px;
          vertical-align: top;
        }
        select {
          box-sizing: border-box;
          height: 24px;
          width: 80px;
          font-size: 12px;
          border: none;
          background: rgb(37, 37, 95);
          color: rgb(169, 190, 201);
          option {
            background: transparent;
            color: rgb(169, 190, 201);
            &:hover {
              color: #ffffff;
              background-color: #000b53;
            }
          }
          &:hover {
            color: #ffffff;
            background-color: #000b53;
          }
        }
      }
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
