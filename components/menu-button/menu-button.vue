<script setup lang="ts">
const AppStore = useAppStore();
const isMenuShow = computed(() => AppStore.isMenuShow.value);
</script>

<template>
  <div class="menu-wrap" :class="[{ show: isMenuShow }]">
    <span></span>
  </div>
</template>

<style scoped>
.menu-wrap {
  position: relative;
  width: 20px;
  min-width: 20px;
  height: 15px;
  --h: 2px;
  --color: var(--fg-color-0);
  --radius: 4px;
}

.menu-wrap.show::before {
  transform: rotate(45deg) translate(4.5px, 5px);
}

.menu-wrap.show::after {
  transform: rotate(-45deg) translate(4px, -5px);
}

.menu-wrap.show > span {
  transform: rotate(-45deg) translate(4px, -5px);
  opacity: 0;
}

.menu-wrap > span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: var(--h);
  background-color: var(--color);
  border-radius: var(--radius);
  transition: 0.2s cubic-bezier(0.25, 0.1, 0, 1.43);
  transition-property: transform,opacity;
}

.menu-wrap::before {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: var(--h);
  border-radius: var(--radius);
  background-color: var(--color);
  transition: 0.3s cubic-bezier(0.25, 0.1, 0.03, 1.66);
  transition-property: transform;
}

.menu-wrap::after {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  height: var(--h);
  background-color: var(--color);
  border-radius: var(--radius);
  transition: 0.3s cubic-bezier(0.25, 0.1, 0.03, 1.66);
  transition-property: transform;
}
</style>