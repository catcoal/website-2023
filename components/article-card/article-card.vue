<template>
  <NuxtLink :to="articleLink" class="article-card-wrap">
    <ArticleHeader :data="data"></ArticleHeader>
    <div class="body-wrap">
      <p>{{ data.description }}</p>
      <div class="images-wrap">
        <ArticleImagesGrid :images="data.covers"></ArticleImagesGrid>
      </div>
    </div>
    <div class="footer-wrap">
      <div class="tag-wrap">
        <TagItem v-for="tag in data.tags" :key="tag.id" :data="tag"></TagItem>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import ArticleHeader from "~/components/article-header/article-header.vue";
import ArticleImagesGrid from "~/components/article-images-grid/article-images-grid.vue";
import TagItem from "~/components/tag-item/tag-item.vue";
// import {} from "~/utils/date.js";

const props = defineProps(["data"]);
// 文章详情列表
const articleLink = computed(() => "/article/" + props.data.id);
</script>

<style scoped>
.article-card-wrap {
  width: 100%;
  background-color: var(--bg-color-0);
  padding: var(--gap);
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  border-radius: var(--radius);
  background-image: linear-gradient(125deg,rgba(0, 186, 124,.2) 0%,rgba(0, 186, 124,.2) 20%,transparent 65%,transparent 100%);
  background-position-x: 90%;
  background-size: 300% 110%;
  /* border: 1px solid var(--border-color-0); */
  border: 1px solid;
  border-color: transparent;
  transition: .8s ease;
  transition-property: background-position-x,border-color;
}
.article-card-wrap:hover{
  background-position-x: 60%;
  border-color: rgba(0, 186, 124, 0.2);
}

.body-wrap {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 15px;
  font-weight: 400;
  /* padding-left: 50px; */
  letter-spacing: 0.5px;
  line-height: 25px;
}

.footer-wrap {
  padding: 10px 0 0 0;
}

.tag-wrap {
  flex-wrap: wrap;
}
</style>
