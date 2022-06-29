<template>
  <!-- 旋钮 -->
  <div class="knob" @mouseenter="knobData.show = true" @mouseleave="knobData.show = knobData.downed">
    <!-- viewBox="0 0 22 22" 用于缩放svg -->
    <svg width="44" height="44" @mousedown="rotate">
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#5f5e5d" class="stop1"></stop>
          <stop offset="100%" stop-color="#6d6c6a" class="stop2"></stop>
        </linearGradient>
        <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur>
        </filter>
      </defs>
      <circle cx="22" cy="22" r="16" fill="#000000" opacity="0.15"></circle>
      <circle cx="22" cy="25" r="14" fill="#000000" opacity="0.4" filter="url(#shadowBlur)"></circle>
      <circle cx="22" cy="22" r="14" fill="url(#gradient)"></circle>
      <path d="M 8,22 a 14,13 0 1,1 28,0 a 14,14 0 1,0 -28,0" fill="#FFFFFF" opacity="0.2"></path>
      <path
        d="M 7.857864376269045,36.14213562373095 A 20,20 0 1,1 36.14213562373095,36.14213562373095"
        fill="none"
        stroke-width="2"
        stroke="#000000"
        opacity="0.3"
      ></path>
      <!-- 圆弧线 -->
      <path :d="knobData.circlePath" fill="none" stroke-width="2" stroke="#88d6c4" class="Knob-highlightPath"></path>
      <!-- 细线 -->
      <path
        :d="knobData.linePath"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke="#000000"
        opacity="0.5"
      ></path>
    </svg>
    <div v-show="knobData.show" class="tip">
      {{ showData }}
    </div>
    <div class="bottom">
      <div>octave</div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 使用方式：根据props的类型提示绑定数据，
 * 其中value需要使用v-model绑定动态数据，如：v-model:value="value"
 * 之后每次旋转结束后value就会自动更新
 */
import { toRange, fix, toMultiple, getPlaces } from 'modules/tools'
import { computed, reactive } from 'vue'
const props = withDefaults(
  defineProps<{
    // 当前数据
    value?: number
    // 显示数据小数点后位数 默认为1
    fix?: number
    // 最小值
    min?: number
    // 最大值
    max?: number
    // 步长
    step?: number
  }>(),
  {
    value: 5,
    fix: 2,
    min: 0,
    max: 10,
    step: 0.1,
  }
)
const emit = defineEmits(['update:value'])

// 点击上下移动鼠标，旋转旋钮
const rotate = (e: MouseEvent) => {
  knobData.downed = true
  const oldPageY = e.pageY,
    oldAngle = knobData.angle
  const move = (event: MouseEvent) => {
    const difY = toMultiple(event.pageY - oldPageY, step)
    knobData.angle = toRange(oldAngle + (difY | 0), 225, -45)
  }
  const moveEnd = () => {
    emit('update:value', showData.value)
    knobData.show = false
    knobData.downed = false
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', moveEnd)
  }
  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', moveEnd)
}
const initialData = {
  // 圆心：22，22
  centerX: 22,
  centerY: 22,
  angle: 225,
  // 圆环 距离圆心20
  circleRadius: 20,
  // 线：距离圆心 7-11
  lineStartRadius: 7,
  lineEndRadius: 11,
}
// 旋钮数据
const knobData: KnobData = reactive({
  show: false, // 提示是否显示
  downed: false, // 是否按下
  // 初始角度为225 最多减小至-45
  angle: 225,
  difAngle: computed(() => initialData.angle - knobData.angle),
  // 1为长弧 0为短弧
  largeArcFlag: computed(() => (knobData.difAngle >= 180 ? 1 : 0)),
  unitX: computed(() => Math.cos((Math.PI * knobData.angle) / 180)),
  unitY: computed(() => Math.sin((Math.PI * knobData.angle) / 180)),

  //  A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  circlePath: computed(() => {
    return `M 7.857864376269045,36.14213562373095 \
    A 20 20 0 ${knobData.largeArcFlag} 1\
     ${initialData.centerX + knobData.unitX * initialData.circleRadius}\
     ${initialData.centerY - knobData.unitY * initialData.circleRadius}`
  }),
  linePath: computed(() => {
    return `M ${initialData.centerX + knobData.unitX * initialData.lineStartRadius}\
     ${initialData.centerY - knobData.unitY * initialData.lineStartRadius} \
    L ${initialData.centerX + knobData.unitX * initialData.lineEndRadius}\
     ${initialData.centerY - knobData.unitY * initialData.lineEndRadius}`
  }),
})
interface KnobData {
  show: boolean
  downed: boolean
  angle: number
  difAngle: number
  largeArcFlag: 1 | 0
  unitX: number
  unitY: number
  circlePath: string
  linePath: string
}
// 份数
const unit = (props.max - props.min) / 270
// 步长 -> 单位角度
const step = props.step / unit
// 显示位数
const digit = Math.min(props.fix, Math.max(getPlaces(props.value), getPlaces(props.step)))
// 显示数据
const showData = computed(() => fix(knobData.difAngle * unit, digit))
// 初始角度
knobData.angle = props.value / unit - 45
</script>

<style lang="scss" scoped>
.knob {
  position: relative;
  width: 72px;
  height: 72px;

  .tip {
    position: absolute;
    left: 50%;
    top: -30px;
    transform: translateX(-50%);
    background-color: black;
    color: rgb(161, 161, 161);
    font-size: 12px;
    padding: 2px 5px;
    &::after {
      content: '';
      position: absolute;
      background-color: black;
      width: 10px;
      height: 5px;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%);
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
    }
  }
  .bottom {
    text-align: center;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
