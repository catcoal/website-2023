<script setup>
import TagItem from "~/components/tag-item/tag-item.vue";
import { FetchTagList } from "~/api/tag";

const TagsData = (await FetchTagList()).data;
</script>

<template>
  <div class="tags-wrap" v-if="TagsData.length">
    <TagItem v-for="tag in TagsData" :key="tag.id" :data="tag"></TagItem>
  </div>
</template>

<style scoped>
.tags-wrap {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border-radius: var(--radius);
}
</style>