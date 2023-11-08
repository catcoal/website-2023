<template>
  <div class="home-wrap">
    <div class="article-list">
      <ArticleCard v-for="item in ArticleData" :data="item" :key="item.id"></ArticleCard>
    </div>
  </div>
</template>

<script setup>
import ArticleCard from "~/components/article-card/article-card.vue";
import { FetchPostList, FetchPostDetail } from "~/api/post";

useHead({
  title: "Lemming"
})

const ArticleData = ref([]);

let res = await FetchPostList({
  tagId: 1
});
ArticleData.value = res.data;

</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>