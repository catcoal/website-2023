<template>
  <div class="container">
    <div class="article-list">
      <ArticleCard
        v-for="item in ArticleData"
        :data="item"
        :key="item.id"
      ></ArticleCard>
    </div>
  </div>
</template>

<script setup>
import ArticleCard from "~/components/article-card/article-card.vue";
import { FetchPostList,FetchPostDetail } from "~/api/post";

const route = useRoute();
let tagId = computed(() => route.params.id);

useHead({
  title:"类别"
})

const ArticleData = ref([]);

let res = await FetchPostList({
    tagId
});
ArticleData.value = res.data.list;
</script>

<style scoped>
.article-list {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}
</style>