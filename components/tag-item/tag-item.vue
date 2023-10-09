<script setup>
const props = defineProps(["data"]);
const categoriesLink = computed(
  () => "/categories/" + props.data.id + "?name=" + props.data.name
);
</script>

<template>
  <object>
    <NuxtLink :to="categoriesLink" class="tag-item">
      <p># {{ data.name }}</p>
    </NuxtLink>
  </object>
</template>

<style scoped>
.tag-item {
  user-select: none;
  cursor: pointer;
  border-radius: var(--radius);
  border: 1px solid var(--theme-color);
  color: var(--theme-color);
  font-size: 12px;
  line-height: 15px;
  display: inline-block;
  padding: 5px 15px;
  white-space: nowrap;
  transition: 0.3s ease;
  transition-property: background-color;
  letter-spacing: 0.5;
  font-weight: 400;
}

.tag-item:hover {
  background-color: var(--theme-color-1);
}
</style>