<template>
  <div class="header-nav">
    <div v-if="routePath !== '/'" class="back-button filter-bg">
      <div key="0" @click="HandleBack" class="back-wrap">
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="lg" />
      </div>
    </div>

    <div class="header-nav-inner filter-bg">
      <div class="page-title" key="1">
        {{ pageNameEnum[routeName] }}
      </div>

      <TagItem @click.stop :data="categoriesData" v-if="routeName == 'categories-id'"></TagItem>
    </div>
  </div>
</template>

<script setup>
import TagItem from "~/components/tag-item/tag-item.vue";

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

.back-button {
  cursor: pointer;
  width: 47px;
  min-width: 47px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-1);
  overflow: hidden;
}

.header-nav-inner {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  border-radius: var(--radius-1);
  overflow: hidden;
}

.filter-bg {
  position: relative;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .04);
}

.filter-bg::after {
  content: '';
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(25px) saturate(5);
  -webkit-backdrop-filter: blur(25px) saturate(5);
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
  transition-property: background-color, color, box-shadow, transform;
  overflow: hidden;
  width: 40px;
  height: 80%;
}

.back-wrap:active {
  transform: scale(0.95);
}

.back-wrap:hover {
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .04), 0 27px 54px rgba(0, 0, 0, .04), 0 17.5px 31.625px rgba(0, 0, 0, .03), 0 10.4px 17.2px rgba(0, 0, 0, .024), 0 5.4px 8.775px rgba(0, 0, 0, .02), 0 2.2px 4.4px rgba(0, 0, 0, .016), 0 0.5px 2.125px rgba(0, 0, 0, .01);
  background-color: var(--theme-color);
  color: #FFF;
}

.page-title {
  white-space: nowrap;
  padding: 0 var(--gap);
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: 500;
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