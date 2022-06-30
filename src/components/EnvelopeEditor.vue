<!-- 音轨包络编辑器 -->
<template>
  <div
    v-if="envelopeEditorData.show"
    class="envelopeEditor"
    :style="envelopeEditorData.style"
    @mousedown="changeZIndex(envelopeEditorData.style)"
  >
    <!-- 标题 -->
    <Title
      :data="envelopeEditorData"
      name="音轨包络编辑器"
      :close="hideEnvelopeEditor"
      :small="true"
      :start="true"
    ></Title>

    <!-- 内容区 -->
    <div v-if="envelopeEditorData.clone" class="content">
      <div class="container">
        <div class="selectSetting">
          <span class="name">作用于:</span>
          <select v-model.number="envelopeEditorData.clone.actTrackId">
            <option v-for="track in trackData.sortedTrackData" :key="track.trackId" :value="track.trackId">
              {{ track.name }}
            </option>
            <option value="0">未绑定</option>
          </select>
        </div>
        <div class="selectSetting">
          <span class="name">类型:</span>
          <select v-model.number="envelopeEditorData.clone.type">
            <option value="1">折线</option>
            <option value="2">正向水平线</option>
            <option value="3">反向水平线</option>
            <option value="4">1/2正弦</option>
          </select>
        </div>
        <div class="selectSetting">
          <span class="name">类别:</span>
          <select v-model.number="envelopeEditorData.clone.category">
            <option value="1">音量</option>
            <option value="2">声响</option>
            <option value="3">……</option>
          </select>
        </div>
      </div>
      <div class="save">
        <button @click="saveEnvelope">保存</button>
      </div>
    </div>
    <div v-else class="content">
      <div class="tip">请先绑定包络</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { envelopeEditorData, hideEnvelopeEditor, saveEnvelope } from 'modules/envelope'
import { changeZIndex } from 'modules/tools'
import { trackData } from 'modules/track'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/button.scss';
@import 'scss/window.scss';
// 工作区样式
.envelopeEditor {
  @include middle();
  @include window-shadow();
  width: 280px;
  background: $window-background-color;
  border-radius: 5px;
  .content {
    .container {
      padding-left: 10px;
      margin: 20px 0;
      font-size: 14px;

      .rangeSetting {
        margin-bottom: 10px;
        height: 20px;
        .name {
          display: inline-block;
          width: 80px;
          text-align: center;
          margin-right: 10px;
          height: 20px;
          line-height: 20px;
          vertical-align: top;
        }
        input[type='range'] {
          -webkit-appearance: none; /*去除默认样式*/
          width: 100px;
          height: 20px;
          vertical-align: top;
          background-color: transparent;
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 14px;
            width: 14px;
            border-radius: 14px;
            background: rgb(139, 200, 231);
          }
          &::-webkit-slider-runnable-track {
            border-radius: 14px;
            height: 14px;
            background: rgb(66, 57, 110);
          }
        }
        .num {
          display: inline-block;
          width: 40px;
          margin-left: 10px;
          text-align: center;
          height: 20px;
          line-height: 20px;
          vertical-align: top;
        }
      }
      .selectSetting {
        margin-bottom: 10px;
        height: 20px;
        .name {
          display: inline-block;
          width: 80px;
          text-align: center;
          margin-right: 10px;
          height: 20px;
          line-height: 20px;
          vertical-align: top;
        }
        select {
          box-sizing: border-box;
          height: 20px;
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
      .textSetting {
        margin-bottom: 10px;
        height: 20px;
        .name {
          display: inline-block;
          width: 80px;
          text-align: center;
          margin-right: 10px;
          height: 20px;
          line-height: 20px;
          vertical-align: top;
        }
        input[type='text'] {
          -webkit-appearance: none;
          width: 100px;
          height: 20px;
          vertical-align: top;
          border: 1px solid rgb(255 255 255 / 10%);
          outline: none;
          background-color: transparent;
          &:focus {
            border: 1px solid black;
            outline: none;
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
