<!-- 主菜单 -->
<template>
  <div v-if="masterMenuData.show" class="masterMask" @click="masterMenuData.show = false">
    <div class="masterMenu">
      <ul class="menu-group">
        <li class="menu-item" @click="newProjectWindowData.show = true">新建</li>
        <li class="menu-item" @click="switchProjectWindowData.show = true">打开</li>
        <li class="menu-item" @click="saveProject">保存</li>
        <li class="menu-item" @click="saveProjectWindowData.show = true">另存为</li>
        <li class="menu-item">&nbsp;</li>
        <li class="menu-item" @click="showPending">导入音乐文件</li>
        <li class="menu-item" @click="importProject">导入项目文件</li>
        <li class="menu-item">&nbsp;</li>
        <li class="menu-item" @click="showPending">导出音乐</li>
        <li class="menu-item" @click="exportProject">导出项目文件</li>
        <li class="menu-item" @click="publishProjectWindowData.show = true">发布项目</li>
        <li class="menu-item">&nbsp;</li>
        <li class="menu-item" @click="showPending">设置</li>
        <li class="menu-item">&nbsp;</li>
        <li class="menu-item" @click="guide">新手教程</li>
        <li class="menu-item" @click="goGitee">操作手册</li>
        <li class="menu-item">&nbsp;</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { guide } from 'modules/driver'
import { masterMenuData } from 'modules/masterMenu'
import {
  newProjectWindowData,
  switchProjectWindowData,
  saveProjectWindowData,
  saveProject,
  publishProjectWindowData,
  exportProject,
  importProject,
} from 'modules/project'
import showPending from 'modules/tools/showPending'

const goGitee = () => {
  window.open('https://gitee.com/du-hao-111/music-editor/blob/master/README.md#%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C')
}
</script>

<style lang="scss" scoped>
.masterMask {
  position: absolute;
  z-index: 99999;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(37, 33, 33, 0.8);
  .masterMenu {
    width: 230px;
    height: 100%;
    padding: 30px;
    background: rgb(84, 226, 129);
    user-select: none;
    .menu-group {
      .menu-item {
        font-size: 20px;
        &:hover {
          font-weight: 600;
        }
      }
    }
    .menu-version {
      padding: 3px;
      border-top: 1px solid rgb(74, 66, 66);
    }
  }
}
</style>
