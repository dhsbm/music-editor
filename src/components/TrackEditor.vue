<!-- 音轨编辑器 -->
<template>
  <EditorWindow v-if="trackEditorData.show" :editor-data="trackEditorData" tips="请先绑定音轨" :save-fun="saveTrack">
    <template #title>
      <Title
        :data="trackEditorData"
        title="音轨参数编辑器"
        :close="hideTrackEditor"
        :small="true"
        :start="true"
      ></Title>
    </template>
    <template #settings>
      <TextSetting v-model:value="trackEditorData.clone!.trackTitle" label="标题"></TextSetting>
      <RangeSetting v-model:value="trackEditorData.clone!.volume"></RangeSetting>
      <div class="selectSetting">
        <span class="name">颜色:</span>
        <select
          v-model="trackEditorData.clone!.color"
          style="color: black"
          :style="`background:${trackEditorData.clone!.color}`"
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
    </template>
  </EditorWindow>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import EditorWindow from 'common/EditorWindow.vue'
import TextSetting from 'common/TextSetting.vue'
import RangeSetting from 'common/RangeSetting.vue'

import { trackData, trackEditorData, hideTrackEditor, saveTrack } from 'modules/track'
</script>

<style lang="scss" scoped>
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
</style>
