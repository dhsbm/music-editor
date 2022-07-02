<!-- 音谱编辑器 -->
<template>
  <EditorWindow
    v-if="patternEditorData.show"
    :editor-data="patternEditorData"
    tips="请先绑定音谱"
    :save-fun="savePattern"
  >
    <template #title>
      <Title
        :data="patternEditorData"
        title="音谱参数编辑器"
        :close="hidePatternEditor"
        :small="true"
        :start="true"
      ></Title>
    </template>
    <template #settings>
      <TextSetting v-model:value="patternEditorData.clone!.patternTitle" label="标题"></TextSetting>
      <RangeSetting v-model:value="patternEditorData.clone!.volume"></RangeSetting>
    </template>
  </EditorWindow>
</template>

<script setup lang="ts">
import EditorWindow from 'common/EditorWindow.vue'
import RangeSetting from 'common/RangeSetting.vue'
import TextSetting from 'common/TextSetting.vue'

import Title from 'common/Title.vue'
import { patternEditorData, hidePatternEditor, savePattern } from 'modules/pattern'
</script>
