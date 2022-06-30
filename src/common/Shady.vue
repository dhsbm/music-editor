<template>
  <!-- 黑幕遮罩层 -->
  <div class="shady"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.shady {
  pointer-events: none; /* 实现点击穿透 */
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  border-top: 1px solid black;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
