<template>
  <div class="sidebar-nav-wrap">
    <div class="sidebar-list">
      <NuxtLink class="nav-item" :class="[{ active: routePath == '/' }]" to="/">
        <div class="nav-item-inner">
          <img src="~/assets/icons/house.svg" alt="" srcset="" />
          <p>无聊记</p>
        </div>
      </NuxtLink>
      <!-- <NuxtLink class="nav-item" :class="[{ 'active': routePath == '/about' }]" to="/about">
        <div class="nav-item-inner">
          <img src="~/assets/icons/house.svg" alt="" srcset="" />
          <p>关于</p>
        </div>
      </NuxtLink> -->
    </div>
  </div>
</template>

<script setup>
import IconLord from "~/components/icon-lord/icon-lord.vue";
const route = useRoute();
const routePath = computed(() => route.path);
// const { $lpop } = useNuxtApp();
// $lpop();
</script>

<style scoped>
.sidebar-nav-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 2px;
}

.sidebar-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.nav-item {
  display: block;
  width: 100%;
  cursor: pointer;
}

.nav-item.active {
  font-weight: 500;
}

.nav-item-inner {
  display: inline-flex;
  align-items: center;
  gap: var(--gap);
  padding: 15px 30px;
  border-radius: var(--radius);
  transition: .3s ease;
  transition-property: background-color, box-shadow;
}

.nav-item.active>.nav-item-inner {
  background-color: var(--bg-color-0);
  box-shadow: 0 0 0 1px rgba(0, 0, 0, .06);
}

.nav-item-inner>img {
  width: 30px;
  height: 30px;
}

@media (max-width: 1024px) {
  .nav-item.active>.nav-item-inner {
    border: 1px solid var(--border-color-0);
  }

  .nav-item-inner {
    display: flex;
    padding: 10px 20px;
    font-size: 16px;
  }

  .nav-item-inner>img {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 768px) {}
</style>