<template>
  <div id="app">
    <AnimateBg></AnimateBg>
    <!-- <div class="root-bg-image"></div> -->
    <NuxtLayout>
      <NuxtLoadingIndicator color="var(--theme-color)" :height="3" />
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup>
import AnimateBg from '~/components/animate-bg/animate-bg.vue';

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 无聊记` : "无聊记";
  },
  htmlAttrs: {
    lang: "zh",
    // 页面色彩模式
    "data-color-mode": "light",
  },
});
</script>

<style>
@import url(./assets/style/global.css);

.root-bg-image {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.05;
  background: url(./assets/images/blob-scatter-haikei.svg);
  background-size: 60%;
  background-position: -10vw -10vw;
}

.page-enter-active,
.page-leave-active {
  transition: 0.3s ease;
  transition-property: opacity, transform;
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.99) translateZ(0);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1) translateZ(0);
}
</style>
