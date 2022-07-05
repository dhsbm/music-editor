<template>
  <div class="rangeSetting">
    <span class="label">{{ label }}:</span>
    <input v-model.number="inlineValue" type="range" :max="max * 100" :min="min * 100" :step="step * 100" />
    <span class="num">{{ inlineValue + '%' }}</span>
    <br />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const prop = withDefaults(
  defineProps<{
    value: number
    label?: string
    min?: number
    max?: number
    step?: number
  }>(),
  {
    label: '响度',
    min: 0,
    max: 2,
    step: 0.01,
  }
)
const emit = defineEmits(['update:value'])

const inlineValue = ref(prop.value * 100)

watch(inlineValue, (now) => {
  emit('update:value', now / 100)
})
watch(
  () => prop.value,
  (now) => {
    inlineValue.value = now * 100
  }
)
</script>

<style lang="scss" scoped>
.rangeSetting {
  margin-bottom: 10px;
  height: 20px;
  .label {
    display: inline-block;
    width: 80px;
    text-align: center;
    margin-right: 10px;
    height: 20px;
    line-height: 20px;
    vertical-align: top;
  }
  input[type='range'] {
    -webkit-appearance: none; /*去除默认样式*/
    width: 100px;
    height: 20px;
    vertical-align: top;
    background-color: transparent;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 14px;
      width: 14px;
      border-radius: 14px;
      background: rgb(139, 200, 231);
    }
    &::-webkit-slider-runnable-track {
      border-radius: 14px;
      height: 14px;
      background: rgb(66, 57, 110);
    }
  }
  .num {
    display: inline-block;
    width: 40px;
    margin-left: 10px;
    text-align: center;
    height: 20px;
    line-height: 20px;
    vertical-align: top;
  }
}
</style>
