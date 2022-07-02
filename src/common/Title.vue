<template>
  <div :class="titleClass" :style="titleStyle" @mousedown="moveDom($event, props.data.style)">
    <span> {{ props.title }} </span>
    <button class="puyin" @click="props.close">&#xe66d;</button>
    <!-- &#xea98;&#xea6b; -->
    <button v-if="props.enlarge" class="puyin enlarge" @click="switchLarge">
      {{ props.large ? '&#xea6b;' : '&#xea98;' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { moveDom } from 'modules/tools'
const props = withDefaults(
  defineProps<{
    data: { style: { transform: string } }
    title: string
    close: () => void
    small?: boolean
    start?: boolean
    enlarge?: boolean
    large?: boolean
  }>(),
  {
    small: false,
    start: false,
    enlarge: false,
    large: false,
  }
)
const emit = defineEmits(['update:large'])
const switchLarge = () => {
  emit('update:large', !props.large)
}
const titleClass = props.small ? 'smallTitle' : 'title'
const titleStyle = props.start ? 'text-align:start;padding-left: 5px' : 'text-align:center'
</script>

<style lang="scss" scoped>
// 标题数据
$title-background-color: rgb(53, 58, 63);
$title-text-color: rgba(255, 248, 222, 0.6);

.title {
  // text-align: center;
  // padding-left: 5px;
  height: 30px;
  font-size: 16px;
  position: relative;
  background-color: $title-background-color;
  span {
    color: $title-text-color;
    line-height: 30px;
  }
  button {
    position: absolute;
    right: 0;
    background-color: transparent;
    border: none;
    color: $title-text-color;
    font-size: 10px;
    width: 30px;
    height: 30px;
    &:hover {
      background-color: rgb(30, 31, 34);
    }
  }
  .enlarge {
    right: 30px;
    font-size: 14px;
  }
}

.smallTitle {
  // text-align: start;
  height: 20px;
  font-size: 12px;
  position: relative;
  background-color: $title-background-color;
  span {
    color: $title-text-color;
    line-height: 20px;
  }
  button {
    position: absolute;
    right: 0;
    background-color: transparent;
    border: none;
    color: $title-text-color;
    font-size: 12px;
    width: 20px;
    height: 20px;
    &:hover {
      background-color: rgb(30, 31, 34);
    }
  }
}
</style>
