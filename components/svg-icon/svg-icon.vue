<template>
  <div class="svg-icon" :style="{ width: size, height: size, color: color }">
    <div v-html="svgContent"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  size: {
    type: [String, Number],
    default: "25px",
  },
  color: {
    type: String,
    default: "currentColor",
  },
});

const svgContent = ref("");

const fetchSvgContent = async () => {
  let newSrc = props.src.replace("~", "/_nuxt");
  try {
    const response = await fetch(newSrc);
    if (response.ok) {
      svgContent.value = await response.text();
    } else {
      console.error(`Failed to fetch SVG from ${newSrc}`);
    }
  } catch (error) {
    console.error(`Error fetching SVG from ${newSrc}: ${error.message}`);
  }
};

onMounted(() => {
  fetchSvgContent();
});
</script>

<style scoped>
.svg-icon{
  display: block;
}
/* 可以在这里添加样式 */
.svg-icon > div {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

<style>
.svg-icon svg {
  display: block;
  width: 100% !important;
  height: 100% !important;
}

.svg-icon svg > * {
  stroke: currentColor !important;
}
</style>
