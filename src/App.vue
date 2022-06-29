<template>
  <div class="app">
    <!-- 头部控制栏 -->
    <HeaderControlBar></HeaderControlBar>
    <!-- 主菜单 -->
    <MastMenu></MastMenu>
    <!-- 工作区 -->
    <Worker></Worker>
    <!-- 登录 -->
    <LoginWindow></LoginWindow>
    <!-- 音轨编辑器 -->
    <TrackEditor></TrackEditor>
    <!-- 音谱编辑器 -->
    <PatternEditor></PatternEditor>
    <!-- 包络节点编辑器 -->
    <DotEditor></DotEditor>
    <!-- 包络编辑器 -->
    <EnvelopeEditor></EnvelopeEditor>
    <!-- 内容编辑器 -->
    <ContentEditor></ContentEditor>
    <!-- 钢琴键盘 -->
    <PianoKeyboard></PianoKeyboard>
    <!-- 历史记录 -->
    <History></History>
    <!-- 素材库 -->
    <Library></Library>
    <!-- 合成器 -->
    <Synthesizer></Synthesizer>
    <!-- 新建项目 -->
    <NewProjectWindow></NewProjectWindow>
    <!-- 打开项目 -->
    <OpenProjectWindow></OpenProjectWindow>
    <!-- 保存项目 -->
    <SaveProjectWindow></SaveProjectWindow>
    <!-- 发布项目 -->
    <PublishProjectWindow></PublishProjectWindow>
    <!-- 意见反馈 -->
    <Feedback></Feedback>
    <!-- 用户菜单 -->
    <UserMenu></UserMenu>
    <!-- 音轨菜单 -->
    <TrackMenu></TrackMenu>
    <!-- 音谱菜单 -->
    <PatternMenu></PatternMenu>
    <!-- 音节菜单 -->
    <NoteMenu></NoteMenu>
    <!-- 包络菜单 -->
    <EnvelopeMenu></EnvelopeMenu>
    <!-- 包络节点菜单 -->
    <DotMenu></DotMenu>
    <!-- 指针悬浮提示框 -->
    <HoverPrompt></HoverPrompt>
    <!-- 中央提示框 -->
    <CenterPrompt></CenterPrompt>
    <!-- 保存提示 -->
    <SavePrompt></SavePrompt>
    <!-- 点击后出现，用于保留指针效果 -->
    <Hit></Hit>
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
import ContentEditor from 'components/ContentEditor.vue'
import PianoKeyboard from 'components/PianoKeyboard.vue'
import History from 'components/History.vue'
import Library from 'components/Library.vue'
import Synthesizer from 'components/Synthesizer.vue'
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
  min-width: 1100px;
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
