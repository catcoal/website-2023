<script setup>
import TagItem from "~/components/tag-item/tag-item.vue";
import { FetchTagList } from "~/api/tag";

const TagsData = ref([]);
const res = await FetchTagList();
TagsData.value = res.data;
</script>

<template>
  <div class="tags-wrap">
    <TagItem v-for="tag in TagsData" :key="tag.id" :data="tag"></TagItem>
  </div>
</template>

<style scoped>
.tags-wrap {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding: var(--gap);
  border: 1px solid var(--border-color-1);
  border-radius: var(--radius);
}
</style>