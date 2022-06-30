<template>
  <div v-if="loginWindowData.show" class="loginWindow">
    <div class="main">
      <button class="close puyin" @click="hideLoginWindow">&#xe66d;</button>
      <ul>
        <li><input v-model="loginWindowData.username" type="text" placeholder="USERNAME" /></li>
        <li><input v-model="loginWindowData.password" type="text" placeholder="PASSWORD" /></li>
        <li class="tip">
          <span>{{ loginWindowData.tip }}</span>
          <span>忘记密码</span>
        </li>
        <li><button class="login" @click="login">LOGIN</button></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginWindowData, hideLoginWindow, login } from 'modules/user'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
// 登录窗口
.loginWindow {
  position: absolute;
  z-index: 99995;
  background-color: rgba(51, 51, 51, 0.8);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  .main {
    @include middle();
    width: 400px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid white;
    border-radius: 15px;
    .close {
      position: absolute;
      right: 10px;
      top: 10px;
      background: transparent;
      color: white;
      border: none;
      &:hover {
        cursor: pointer;
      }
    }
    li {
      list-style-type: none;
      text-align: center;
      padding-top: 10px;
      input {
        font-size: 20px;
        border: none;
        box-sizing: border-box;
        padding: 5px;
        background: transparent;
        border-bottom: 1px solid white;
        outline: none;
        color: white;
      }
      &.tip {
        display: flex;
        font-size: 14px;
        span:nth-child(1) {
          flex: 1;
          text-align: start;
          color: red;
        }
        span:nth-child(2) {
          color: white;
          &:hover {
            color: blue;
          }
        }
      }
      .login {
        font-size: 20px;
        border: 1px solid white;
        padding: 5px;
        background: transparent;
        color: white;
        border-radius: 5px;
        width: 150px;
        margin-top: 10px;
        transition: 0.2s linear;
        &:hover {
          background: white;
          color: black;
          border: 1px solid black;
        }
      }
    }
  }
}
</style>
