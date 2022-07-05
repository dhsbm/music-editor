<template>
  <div class="selectSetting">
    <span class="name">{{ label }}:</span>
    <select v-model.number="inlineValue">
      <option v-for="item in list" :key="item.value" :value="item.value">
        {{ item.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const prop = defineProps<{
  value: number
  list: { name: string; value: number }[]
  label: string
}>()
const emit = defineEmits(['update:value'])

const inlineValue = ref(prop.value)

watch(inlineValue, (now) => {
  emit('update:value', now)
})

watch(
  () => prop.value,
  (now) => {
    inlineValue.value = now
  }
)
</script>

<style lang="scss" scoped>
.selectSetting {
  margin-bottom: 10px;
  height: 20px;
  .name {
    display: inline-block;
    width: 80px;
    text-align: center;
    margin-right: 10px;
    height: 20px;
    line-height: 20px;
    vertical-align: top;
  }
  select {
    box-sizing: border-box;
    height: 20px;
    width: 80px;
    font-size: 12px;
    border: none;
    background: rgb(37, 37, 95);
    color: rgb(169, 190, 201);
    option {
      background: transparent;
      color: rgb(169, 190, 201);
      &:hover {
        color: #ffffff;
        background-color: #000b53;
      }
    }
    &:hover {
      color: #ffffff;
      background-color: #000b53;
    }
  }
}
</style>
