<template>
  <div id="app">
    <NuxtLayout>
      <NuxtLoadingIndicator color="var(--theme-color)" :height="3" />
      <!-- <Loading v-show="isPageLoading"></Loading> -->
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>

<script setup>
import Loading from "~/components/loading/loading.vue";

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

.page-enter-active,
.page-leave-active {
  transition: 0.3s ease;
  transition-property: opacity, transform;
}

.page-enter-from {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.page-leave-to {
  opacity: 0;
  transform: translate3d(-20px, 0, 0);
}
</style>
