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
}

.nav-item.active > .nav-item-inner {
  background-color: var(--bg-color-0);
}

.nav-item-inner > img {
  width: 30px;
  height: 30px;
}
</style>