<template>
  <div class="home-wrap">
    <div class="article-list">
      <ArticleCard v-for="item in ArticleData" :data="item" :key="item.id"></ArticleCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArticleCard from "~/components/article-card/article-card.vue";
import { FetchPostList, PostDetail } from "~/api/post";

useHead({
  title: "Lemming"
})

const ArticleData = ref<PostDetail[]>([]);

let res = await FetchPostList();
ArticleData.value = res.data as PostDetail[];

</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>