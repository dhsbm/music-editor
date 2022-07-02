<!-- 音节编辑器 -->
<template>
  <EditorWindowVue v-if="noteEditorData.show" :editor-data="noteEditorData" tips="请双击绑定音节" :save-fun="saveNote">
    <template #title>
      <Title :data="noteEditorData" title="音节参数编辑器" :close="hideNoteEditor" :small="true" :start="true"></Title>
    </template>
    <template #settings>
      <RangeSetting v-model:value="noteEditorData.clone!.volume"></RangeSetting>
    </template>
  </EditorWindowVue>
</template>

<script setup lang="ts">
import EditorWindowVue from 'common/EditorWindow.vue'
import RangeSetting from 'common/RangeSetting.vue'
import Title from 'common/Title.vue'
import { noteEditorData, hideNoteEditor, saveNote } from 'modules/note'
</script>
