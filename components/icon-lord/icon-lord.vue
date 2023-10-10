<script setup lang="ts">
type Trigger =
  | "hover"
  | "click"
  | "loop"
  | "loop-on-hover"
  | "morph"
  | "boomerang";

const props = defineProps({
  icon: {
    type: String,
    default: "nocvdjmh",
  },
  // 触发target
  target: {
    type: String,
    default: "div",
  },
  color: {
    type: String,
    default: "#FFF",
  },
  trigger: {
    type: String as PropType<Trigger>,
    default: "hover",
  },
  delay: {
    type: Number,
    default: 2000,
  },
  size:{
    type: Number,
    default: 20,
  },
  state:{
    type: String,
    default: "",
  }
});

const colors = computed(() => "primary:" + props.color);
const url = computed(() => "https://cdn.lordicon.com/" + props.icon + ".json");
const size = computed(()=> `width: ${props.size}px; height: ${props.size}px`);
</script>

<template>
  <i :style="size">
    <lord-icon
      :src="url"
      :target="props.target"
      :trigger="props.trigger"
      :colors="colors"
      :delay="props.delay"
      :state="props.state"
      style="width: 100%; height: 100%"
    >
    </lord-icon>
  </i>
</template>

<style scoped>
</style>