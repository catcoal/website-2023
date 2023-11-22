<template>
  <div class="default-layout">
    <aside class="AppSide left" :class="[{ show: isMenuShow }]">
      <SidebarNav></SidebarNav>
    </aside>
    <main class="AppMain">
      <HeaderNav></HeaderNav>
      <slot></slot>
    </main>
    <aside class="AppSide right">
      <ArticleImagesGrid :mode="'recommend'"></ArticleImagesGrid>
      <NoticeCom></NoticeCom>
      <TagsCom></TagsCom>
      <FooterCom></FooterCom>
    </aside>
  </div>
</template>

<script setup lang="ts">
import ArticleImagesGrid from "~/components/article-images-grid/article-images-grid.vue";
import NoticeCom from "~/components/notice-com/notice-com.vue";
import TagsCom from "~/components/tags-com/tags-com.vue";
import FooterCom from "./components/footer.vue";
import HeaderNav from "./components/headerNav.vue";
import SidebarNav from "./components/sidebarNav.vue";
const AppStore = useAppStore();
const isMenuShow = computed(() => AppStore.isMenuShow.value);
</script>

<style scoped>
.default-layout {
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: var(--app-max-width);
  margin: 0 auto;
  padding: var(--gap);
  gap: var(--gap);
}

.AppSide {
  position: sticky;
  top: var(--gap);
  width: 100%;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

.AppSide.left {
  /* background-color: var(--AppSideNav-bg); */
  border-radius: var(--radius);
  width: 100%;
  max-width: 240px;
}

.AppSide.right {
  width: 100%;
  max-width: 300px;
}

.AppMain {
  position: relative;
  width: 100%;
  height: 100%;
  word-break: break-word;
}

@media (max-width: 1024px) {

  /* 在小屏幕上的样式 */
  .default-layout {
    max-width: 768px;
    margin: 0 auto;
  }

  .AppSide.left {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    pointer-events: none;
    transition: 0.3s cubic-bezier(0.25, 0.1, 0.09, 1.19);
    transition-property: opacity;
    padding: var(--gap);
    background-color: rgba(110, 181, 133, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    max-width: 100%;
    border-radius: 0;
  }

  .AppSide.left.show {
    opacity: 1;
    pointer-events: unset;
  }

  .AppSide.left.show>.sidebar-nav-wrap {
    transform: translateX(0%);
  }

  .AppSide.right {
    max-width: 260px;
  }

  .sidebar-nav-wrap {
    /* background-color: rgba(244, 246, 251, 0.85); */
    /* backdrop-filter: blur(12px); */
    border: 1px solid var(--border-color-0);
    background-color: var(--bg-color-1);
    border-radius: var(--radius);
    max-width: 250px;
    margin-top: 60px;
    padding: var(--gap);
    transform: translateX(-100%);
    transition: 0.4s cubic-bezier(0.26, 1.38, 0.64, 1);
    transition-property: transform;
  }
}

@media (max-width: 768px) {

  /* 在小屏幕上的样式 */
  .default-layout {
    max-width: 450px;
    margin: 0 auto;
  }

  .AppSide.right {
    display: none;
  }

  .sidebar-nav-wrap {
    max-width: 425px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}
</style>
  