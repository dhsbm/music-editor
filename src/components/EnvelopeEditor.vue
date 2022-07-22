<!-- 音轨包络编辑器 -->
<template>
  <EditorWindow
    v-if="envelopeEditorData.show"
    :editor-data="envelopeEditorData"
    tips="请先绑定包络"
    :save-fun="saveEnvelope"
  >
    <template #title>
      <Title
        :data="envelopeEditorData"
        title="音轨包络编辑器"
        :close="hideEnvelopeEditor"
        :small="true"
        :start="true"
      ></Title>
    </template>
    <template #settings>
      <TextSetting v-model:value="envelopeEditorData.clone!.envelopeTitle" label="标题"></TextSetting>
      <SelectSetting
        v-model:value="envelopeEditorData.clone!.actTrackId"
        label="作用于"
        :list="actTrackList"
      ></SelectSetting>
      <SelectSetting v-model:value="envelopeEditorData.clone!.shape" label="线形" :list="shapeList"></SelectSetting>
      <SelectSetting
        v-model:value="envelopeEditorData.clone!.category"
        label="类别"
        :list="categoryList"
      ></SelectSetting>
    </template>
  </EditorWindow>
</template>

<script setup lang="ts">
import TextSetting from 'common/TextSetting.vue'
import SelectSetting from 'common/SelectSetting.vue'
import EditorWindow from 'common/EditorWindow.vue'

import Title from 'common/Title.vue'
import { envelopeEditorData, hideEnvelopeEditor, saveEnvelope } from 'modules/envelope'
import { trackData } from 'modules/track'
import { computed } from '@vue/reactivity'
import { Category, Shape } from '@/class/Interface'

const actTrackList = computed(() => {
  let list = trackData.sortedTrackData.map((track) => ({ name: track.trackTitle, value: track.trackId }))
  list.push({ name: '未绑定', value: 0 })

  return list
})

const shapeList = [
  { name: '折线', value: Shape.Broken },
  { name: '正向水平线', value: Shape.ForwardHr },
  { name: '反向水平线', value: Shape.reverseHr },
  { name: '1/2正弦', value: Shape.Sine },
]
const categoryList = [
  { name: '响度', value: Category.Volume },
  { name: '声相', value: Category.Panner },
]
</script>
