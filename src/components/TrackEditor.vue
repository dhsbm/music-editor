<!-- 音轨编辑器 -->
<template>
  <div
    v-if="trackEditorData.show"
    class="trackEditor window"
    :style="trackEditorData.style"
    @mousedown="changeZIndex(trackEditorData.style)"
  >
    <Title :data="trackEditorData" name="音轨参数编辑器" :close="hideTrackEditor" :small="true" :start="true"></Title>
    <div v-if="trackEditorData.clone" class="content">
      <div class="container">
        <div class="textSetting">
          <span class="name">名称</span>
          <input v-model="trackEditorData.clone.name" type="text" />
        </div>
        <div class="rangeSetting">
          <span class="name">响度:</span>
          <input v-model.number="trackEditorData.clone.volume" type="range" max="100" min="0" step="1" />
          <span class="num">{{ trackEditorData.clone.volume }}</span>
        </div>
        <div class="selectSetting">
          <span class="name">音源:</span>
          <select v-model.number="trackEditorData.clone.source">
            <option value="1">钢琴</option>
            <option value="2">古筝</option>
            <option value="3">鼓</option>
            <option value="4">笛</option>
            <option value="5">自定义合成器</option>
          </select>
        </div>
        <div class="selectSetting">
          <span class="name">颜色:</span>
          <select
            v-model="trackEditorData.clone.color"
            style="color: black"
            :style="`background:${trackEditorData.clone.color}`"
          >
            <option
              v-for="color in trackData.colorList"
              :key="color"
              :value="color"
              style="color: black"
              :style="`background:${color}`"
            >
              {{ color }}
            </option>
          </select>
        </div>
      </div>
      <div class="save">
        <button @click="saveTrack">保存</button>
      </div>
    </div>
    <div v-else class="content">
      <div class="tip">请双击绑定音轨</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { changeZIndex } from 'modules/tools'
import { trackData, trackEditorData, hideTrackEditor, saveTrack } from 'modules/track'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/button.scss';
@import 'scss/window.scss';
// 音轨/音谱/音节 参数编辑器样式
.trackEditor {
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
