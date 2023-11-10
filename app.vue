<template>
  <div id="app">
    <div class="root-bg-image"></div>
    <NuxtLayout>
      <NuxtLoadingIndicator color="var(--theme-color)" :height="3" />
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup>

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 无聊记` : "无聊记";
  },
  htmlAttrs: {
    // 页面色彩模式
    "data-color-mode": "light",
  },
});

// const NuxtApp = useNuxtApp();
// const isPageLoading = ref(false);
// NuxtApp.hook("page:start", () => {
//   isPageLoading.value = true;
// });
// NuxtApp.hook("page:finish", () => {
//   isPageLoading.value = false;
// });
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
  transform: translate3d(20px, 0, 0) translateZ(0);
}

.page-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0) translateZ(0);
}
</style>
