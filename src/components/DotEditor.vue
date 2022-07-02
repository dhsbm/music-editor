<!-- 包络节点编辑器 -->
<template>
  <EditorWindow v-if="dotEditorData.show" :editor-data="dotEditorData" tips="请先绑定节点" :save-fun="saveDot">
    <template #title>
      <Title
        :data="dotEditorData"
        title="包络节点参数编辑器"
        :close="hideDotEditor"
        :small="true"
        :start="true"
      ></Title>
    </template>
    <template #settings>
      <TextSetting v-model:value="dotEditorData.clone!.y" label="垂直位置"></TextSetting>
    </template>
  </EditorWindow>
</template>

<script setup lang="ts">
import TextSetting from 'common/TextSetting.vue'
import Title from 'common/Title.vue'
import EditorWindow from 'common/EditorWindow.vue'
import { dotEditorData, hideDotEditor, saveDot } from 'modules/dot'
</script>
