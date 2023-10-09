<script setup>
import ArticleHeader from "~/components/article-header/article-header.vue";
import RichText from "./components/rich-text.vue";
import { FetchPostDetail } from "~/api/post";

const route = useRoute();
const PostDetail = ref({});
let ArticleId = computed(() => route.params.id);

let res = await FetchPostDetail(ArticleId.value);
PostDetail.value = res.data;

useHead({
  title: PostDetail.value.title,
});

</script>

<template>
  <div class="post-wrap">
    <ArticleHeader :data="PostDetail"></ArticleHeader>
    <div class="body-wrap">
      <RichText :richText="PostDetail.content"></RichText>
    </div>
  </div>
</template>

<style scoped>
.post-wrap {
  background-color: var(--primary-bg);
  padding: var(--gap);
  border-radius: var(--radius);
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: var(--fg-color-0);
}

.header-wrap {
  display: flex;
  gap: 10px;
}

.avatar-wrap {
  width: 40px;
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar-wrap > img {
  width: 100%;
  height: 100%;
}

.user-info-wrap {
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-info-wrap > span {
  display: block;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
}

.user-info-wrap > h2 {
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
}

.content img {
  width: 100%;
}
</style>