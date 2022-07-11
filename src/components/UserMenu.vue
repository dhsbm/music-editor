<!-- 用户菜单 -->
<template>
  <div v-show="userMenuData.show" class="userMenu">
    <div v-if="globalData.login">
      <div class="name">{{ globalData.user.userName }}</div>
      <div class="content">
        <div @mousedown="showPending">个人中心</div>
        <div @mousedown="showPending">项目管理</div>
        <div @mousedown="feedbackData.show = true">意见反馈</div>
        <div @mousedown="logout">退出登录</div>
      </div>
    </div>
    <div v-else>
      <div class="login" @mousedown="showLoginWindow">登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userMenuData, hideUserMenu, logout, showLoginWindow } from 'modules/user'
import { globalData } from 'modules/globalData'
import { feedbackData } from 'modules/feedback'
import showPending from 'modules/tools/showPending'
document.addEventListener('mousedown', () => {
  hideUserMenu()
})
</script>

<style lang="scss" scoped>
// 用户菜单
.userMenu {
  position: absolute;
  z-index: 99999;
  right: 10px;
  top: 48px;
  width: 160px;
  color: #aca2a2;
  background-color: #3f444a;
  text-align: center;
  .name {
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }
  .content {
    div {
      height: 30px;
      font-size: 14px;
      line-height: 30px;
      border-top: 1px solid #000;
      &:hover {
        color: #ffffff;
        background-color: #121416;
      }
    }
  }
  .login {
    height: 100px;
    font-size: 20px;
    line-height: 100px;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>
