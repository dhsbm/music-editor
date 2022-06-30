<!-- 保存项目 -->
<template>
  <div
    v-if="publishProjectWindowData.show"
    class="publish-project"
    :style="publishProjectWindowData.style"
    @mousedown="changeZIndex(publishProjectWindowData.style)"
  >
    <Title
      :data="publishProjectWindowData"
      name="发布项目"
      :close="() => (publishProjectWindowData.show = false)"
    ></Title>
    <div class="form">
      <div class="form-item">
        <span class="label">曲名：</span>
        <div class="form-item-content">
          <input v-model="publishProjectWindowData.song" type="text" />
        </div>
      </div>
      <div class="form-item">
        <span class="label">文章名：</span>
        <div class="form-item-content">
          <input v-model="publishProjectWindowData.title" type="text" />
        </div>
      </div>
      <div class="form-item">
        <span class="label">添加标签：</span>
        <div class="form-item-content">
          <div class="tag-list">
            <div v-for="(tag, index) in publishProjectWindowData.tagList" :key="index" class="tag">
              {{ tag }}
              <span class="close" @click="deleteProjectTag(index)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="none" d="M0 0h48v48H0z"></path>
                  <path
                    d="M24 2c12.2 0 22 9.8 22 22s-9.8 22-22 22S2 36.2 2 24 11.8 2 24 2zm0 4C14.1 6 6 14.1 6 24s8.1 18 18 18 18-8.1 18-18S33.9 6 24 6zm-4.9 10.2l4.9 4.9 5-4.9c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4l-5 4.9 5 5c.4.4.4 1 0 1.4l-1.4 1.4c-.4.4-1 .4-1.4 0l-5-5-4.9 5c-.4.4-1 .4-1.4 0l-1.4-1.4c-.4-.4-.4-1 0-1.4l4.9-5-4.9-4.9c-.4-.4-.4-1 0-1.4l1.4-1.4c.3-.4 1-.4 1.4 0z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <input v-model="publishProjectWindowData.tag" type="text" @keydown="inputProjectTag" />
        </div>
      </div>
      <div class="form-item">
        <span class="label"></span>
        <div class="form-item-content">
          <span>工程 id：{{ publishProjectWindowData.projectId }}</span>
          <span style="float: right">时长: {{ publishProjectWindowData.projectTime }}</span>
        </div>
      </div>

      <div class="form-item">
        <span class="label">文章内容：</span>
        <div class="form-item-content">
          <textarea v-model="publishProjectWindowData.article"></textarea>
        </div>
      </div>
    </div>
    <div class="bottom">
      <button @click="publishProject">发布项目</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from 'common/Title.vue'
import { changeZIndex } from 'modules/tools'
import { publishProjectWindowData, publishProject, inputProjectTag, deleteProjectTag } from 'modules/project'
</script>

<style lang="scss" scoped>
@import 'scss/middle.scss';
@import 'scss/window.scss';
@import 'scss/scrollbar.scss';
@import 'scss/button.scss';

// 保存项目
.publish-project {
  @include middle();
  @include window-shadow();
  width: 500px;
  height: 380px;
  background: $window-background-color;
  z-index: 4;
  .form {
    padding: 10px 20px;
    font-size: 13px;
    .form-item {
      display: flex;
      margin-bottom: 5px;
      align-items: center;
      .label {
        margin: 4px 0;
        width: 70px;
        height: 30px;
        line-height: 30px;
        padding-right: 3px;
        text-align: end;
        vertical-align: bottom;
      }
      .form-item-content {
        flex: 1;
        position: relative;
        input {
          height: 30px;
          width: 100%;
          border: none;
          color: #fff8de;
          padding-left: 5px;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
          vertical-align: bottom;
        }
        textarea {
          -webkit-appearance: none;
          resize: none;
          display: inline-block;
          box-sizing: border-box;
          width: 100%;
          height: 100px;
          border: none;
          border-radius: 0;
          color: #fff8de;
          background: rgba(0, 0, 0, 0.3);
          box-shadow: 0 0 0 1px rgb(255 255 255 / 10%);
          padding: 5px;
          font-size: 12px;
          @include scrollbar();
        }
        .tag-list {
          position: absolute;
          height: 30px;
          padding: 4px 0;
          line-height: 20px;
          display: flex;
          flex-wrap: nowrap;
          right: 0;
          .tag {
            background-color: rgba($color: #e8f3ff, $alpha: 0.8);
            outline: 2px solid #33909f;
            padding: 0px 5px;
            margin-left: 10px;
            flex-wrap: nowrap;
            display: flex;
            .close {
              padding: 0;
              svg {
                vertical-align: text-bottom;
                width: 14px;
                height: 14px;
              }
            }
          }
        }
      }
    }
  }
  .bottom {
    text-align: end;
    padding-right: 20px;
    button {
      @include transparent-button();
    }
  }
}
</style>
