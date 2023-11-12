<template>
  <NuxtLink :to="articleLink" class="article-card-wrap" :aria-label="data.title">
    <ArticleHeader :data="data"></ArticleHeader>
    <div class="body-wrap">
      <p>{{ data.description }}</p>
      <div class="images-wrap" v-if="data.covers.length">
        <ArticleImagesGrid :alt="data.title" :images="data.covers"></ArticleImagesGrid>
      </div>
    </div>
    <div class="footer-wrap" v-if="data.tags.length">
      <div class="tag-wrap">
        <TagItem v-for="tag in data.tags" :key="tag.id" :data="tag"></TagItem>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { PostDetail } from "~/api/post";
import ArticleHeader from "~/components/article-header/article-header.vue";
import ArticleImagesGrid from "~/components/article-images-grid/article-images-grid.vue";
import TagItem from "~/components/tag-item/tag-item.vue";

const props = defineProps<{
  data: PostDetail
}>()

// 文章详情列表
const articleLink = computed(() => "/article/" + props.data.enTitle);
</script>

<style scoped>
.article-card-wrap {
  position: relative;
  width: 100%;
  background-color: var(--bg-color-0);
  padding: var(--gap);
  display: inline-flex;
  flex-direction: column;
  gap: 10px;
  border-radius: var(--radius);
  background-image: linear-gradient(125deg, rgba(0, 186, 124, .1) 0%, rgba(0, 186, 124, 0.1) 20%, transparent 65%, transparent 100%);
  background-position-x: 90%;
  background-size: 300% 110%;
  border: 1px solid;
  border-color: transparent;
  transition: .8s ease;
  transition-property: background-position-x border-color box-shadow;
  will-change: background-position-x box-shadow;
}

.article-card-wrap::after {
  opacity: 0;
  content: "";
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border-radius: calc(var(--radius) - 1px);
  border: 1px solid hsla(0, 0%, 100%, 0.22);
  pointer-events: none;
  mask-image: linear-gradient(0deg, transparent, #000);
  -webkit-mask-image: linear-gradient(0deg, transparent, #000);
  z-index: 1;
}

.article-card-wrap:hover {
  background-position-x: 50%;
  border: 1px solid rgba(0, 186, 124, 0.08);
  box-shadow: 0 2px 4px rgba(0, 186, 124, 0.04);
}

.article-card-wrap:hover::after {
  opacity: 1;
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
  display: flex;
  flex-wrap: wrap;
  gap: 5px 10px;
}
</style>
