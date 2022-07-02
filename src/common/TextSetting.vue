<template>
  <div class="textSetting">
    <div class="textSetting">
      <span class="label">{{ label }}</span>
      <input v-model="inlineValue" type="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const prop = defineProps<{
  value: string | number
  label: string
}>()
const emit = defineEmits(['update:value'])

const inlineValue = ref(prop.value)
const num = typeof prop.value === 'number'

watch(inlineValue, (now) => {
  emit('update:value', num ? parseFloat(now as string) : now)
})
watch(
  () => prop.value,
  (now) => {
    inlineValue.value = now
  }
)
</script>

<style lang="scss" scoped>
.textSetting {
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
  input[type='text'] {
    -webkit-appearance: none;
    width: 100px;
    height: 20px;
    vertical-align: top;
    border: 1px solid rgb(255 255 255 / 10%);
    outline: none;
    background-color: transparent;
    &:focus {
      border: 1px solid black;
      outline: none;
    }
  }
}
</style>
