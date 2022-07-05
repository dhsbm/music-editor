<template>
  <div class="app">
    <HeaderControlBar></HeaderControlBar>
    <MastMenu></MastMenu>
    <Worker></Worker>
    <LoginWindow></LoginWindow>
    <TrackEditor></TrackEditor>
    <PatternEditor></PatternEditor>
    <DotEditor></DotEditor>
    <NoteEditor></NoteEditor>
    <EnvelopeEditor></EnvelopeEditor>
    <ContentEditor></ContentEditor>
    <PianoKeyboard></PianoKeyboard>
    <History></History>
    <Library></Library>
    <SourceEditor></SourceEditor>
    <NewProjectWindow></NewProjectWindow>
    <OpenProjectWindow></OpenProjectWindow>
    <SaveProjectWindow></SaveProjectWindow>
    <PublishProjectWindow></PublishProjectWindow>
    <Feedback></Feedback>
    <UserMenu></UserMenu>
    <TrackMenu></TrackMenu>
    <PatternMenu></PatternMenu>
    <NoteMenu></NoteMenu>
    <EnvelopeMenu></EnvelopeMenu>
    <DotMenu></DotMenu>
    <HoverPrompt></HoverPrompt>
    <CenterPrompt></CenterPrompt>
    <SavePrompt></SavePrompt>
    <Hit></Hit>
    <TimeMask></TimeMask>
  </div>
</template>

<script lang="ts" setup>
import HeaderControlBar from 'components/HeaderControlbar.vue'
import MastMenu from 'components/MastMenu.vue'
import Worker from 'components/Worker.vue'
import LoginWindow from 'components/Login.vue'
import TrackEditor from 'components/TrackEditor.vue'
import PatternEditor from 'components/PatternEditor.vue'
import DotEditor from 'components/DotEditor.vue'
import EnvelopeEditor from 'components/EnvelopeEditor.vue'
import NoteEditor from 'components/NoteEditor.vue'
import ContentEditor from 'components/ContentEditor.vue'
import PianoKeyboard from 'components/PianoKeyboard.vue'
import History from 'components/History.vue'
import Library from 'components/Library.vue'
import SourceEditor from 'components/SourceEditor.vue'
import NewProjectWindow from 'components/NewProjectWindow.vue'
import OpenProjectWindow from 'components/OpenProjectWindow.vue'
import SaveProjectWindow from 'components/SaveProjectWindow.vue'
import PublishProjectWindow from 'components/PublishProjectWindow.vue'
import Feedback from 'components/Feedback.vue'
import UserMenu from 'components/UserMenu.vue'
import TrackMenu from 'components/TrackMenu.vue'
import PatternMenu from 'components/PatternMenu.vue'
import NoteMenu from 'components/NoteMenu.vue'
import DotMenu from 'components/DotMenu.vue'
import EnvelopeMenu from 'components/EnvelopeMenu.vue'
import HoverPrompt from 'components/HoverPrompt.vue'
import CenterPrompt from 'components/CenterPrompt.vue'
import SavePrompt from 'components/SavePrompt.vue'
import Hit from 'components/Hit.vue'
import TimeMask from 'components/TimeMask.vue'
import { init } from 'modules/init'

// 初始化
init()
</script>

<!-- 全局样式 -->
<style lang="scss">
/* 导入 */
@font-face {
  font-family: 'puyin';
  /* Project id 3144556 */
  src: url('//at.alicdn.com/t/font_3144556_h3feqznp3fn.woff2?t=1648948021806') format('woff2'),
    url('//at.alicdn.com/t/font_3144556_h3feqznp3fn.woff?t=1648948021806') format('woff'),
    url('//at.alicdn.com/t/font_3144556_h3feqznp3fn.ttf?t=1648948021806') format('truetype');
}

.puyin {
  font-family: 'puyin' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  margin: 0 auto;
  // height: 950px;
  max-width: 2000px;
  min-width: 1200px;
  position: relative;
  cursor: default;
  user-select: none;
  overflow: hidden;
}

div {
  box-sizing: border-box;
}

button,
input,
canvas {
  vertical-align: bottom;
}

.ew-resize {
  cursor: ew-resize;
}

.ns-resize {
  cursor: ns-resize;
}
</style>
