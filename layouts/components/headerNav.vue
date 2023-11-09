<template>
  <div class="header-nav">
    <div @click="SwitchMenuShow" class="menu-button filter-bg Stereobox">
      <MenuButton></MenuButton>
    </div>
    <div class="header-nav-inner filter-bg Stereobox">
      <div v-if="routePath !== '/'" key="0" @click="HandleBack" class="back-wrap">
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="lg" />
      </div>

      <div class="page-title" key="1">
        {{ pageNameEnum[routeName] }}
      </div>

      <TagItem @click.stop :data="categoriesData" v-if="routeName == 'categories-id'"></TagItem>
    </div>
  </div>
</template>

<script setup>
import TagItem from "~/components/tag-item/tag-item.vue";
import MenuButton from "~/components/menu-button/menu-button.vue";

const AppStore = useAppStore();
const isMenuShow = computed(() => AppStore.isMenuShow.value);

const route = useRoute();
const router = useRouter();
const routePath = computed(() => route.path);
const routeName = computed(() => route.name);

// 类别数据
const categoriesData = computed(() => {
  return { id: route.params?.id, name: route.query?.name };
});

// 页面名称枚举
const pageNameEnum = {
  index: "无聊记",
  about: "关于",
  "article-id": "帖子",
  "categories-id": "类别",
};

const HandleBack = () => {
  router.back();
};

const SwitchMenuShow = () => {
  if (isMenuShow.value) {
    AppStore.hidenMenu();
  } else {
    AppStore.showMenu();
  }
};
</script>

<style scoped>
.header-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  z-index: 999;
  top: var(--gap);
  width: 100%;
  padding: 0 5px;
  height: 47px;
  margin-bottom: var(--gap);
}

.menu-button {
  cursor: pointer;
  width: 47px;
  min-width: 47px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-r);
}

.header-nav-inner {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  border-radius: var(--radius-1);
  overflow: hidden;
  /* box-shadow: 0 0 10px 5px rgba(244, 246, 251, 0.85); */
}

.filter-bg {
  background-color: rgba(244, 246, 251, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-color-0);
}

.back-wrap {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: var(--radius-r);
  cursor: pointer;
  transition: 0.3s ease;
  transition-property: background-color;
  overflow: hidden;
  width: 47px;
  height: 100%;
}

.back-wrap:hover {
  background-color: var(--bg-color-0);
}

.page-title {
  padding: 0 var(--gap);
  font-size: 20px;
  font-weight: 700;
}

@media (min-width: 1024px) {

  /* 在小屏幕上的样式 */
  .menu-button {
    display: none;
  }
}

@media (max-width: 1024px) {
  .header-nav {
    padding: 0;
  }
}
</style>