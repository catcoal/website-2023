<script setup lang="ts">
import ArticleHeader from "~/components/article-header/article-header.vue";
import RichText from "./components/rich-text.vue";
import Comment from "./components/comment.vue";
import { FetchPostDetail, PostDetail, PostDetailKey } from "~/api/post";

const route = useRoute();
const PostDetail = ref<PostDetail>();
let ArticleId = computed(() => route.params.id as string);
PostDetail.value = (await FetchPostDetail(ArticleId.value)).data;
// 提供数据给子组件
provide(PostDetailKey, PostDetail);

useHead({
  title: PostDetail.value?.title || '',
});
</script>

<template>
  <div class="post-wrap">
    <ArticleHeader :data="PostDetail!"></ArticleHeader>
    <div class="body-wrap">
      <RichText :richText="PostDetail!.content"></RichText>
    </div>
  </div>
  <div class="comment-wrap">
    <Comment></Comment>
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

.avatar-wrap>img {
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

.user-info-wrap>span {
  display: block;
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
}

.user-info-wrap>h2 {
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
}

.content img {
  width: 100%;
}

.comment-wrap {
  margin-top: var(--gap);
}
</style>