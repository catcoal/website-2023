<script setup lang="ts">
import { FetchPostRecommendList, PostDetail } from "~/api/post";
import { OptimizeImageURL } from "~/utils/utils";


const props = defineProps<{
  alt?: string,
  images?: PostDetail[] | string[],
  mode?: 'recommend' | 'default'
}>();

const imageItems = ref(props.images || []);

if (props.mode === "recommend") {
  // 获取推荐数据
  let res = await FetchPostRecommendList();
  imageItems.value = res.data as PostDetail[];
}

const articleLink = (item: PostDetail) => {
  if (props.mode == 'recommend') {
    return "/article/" + item.enTitle;
  }
};

const imageClass = computed(() => {
  switch (imageItems.value?.length) {
    case 1:
      return "one";
    case 2:
      return "two";
    case 3:
      return "three";
    case 4:
      return "four";
    case 5:
      return "five";
    case 6:
      return "six";
    default:
      return "";
  }
});

// 图片质量调整
const imageQuality = (url: string) => {
  if (imageItems.value.length <= 1) {
    return OptimizeImageURL(url, 50)
  } else {
    return OptimizeImageURL(url, 50)
  }
}
</script>

<template>
  <!-- 推荐 -->
  <object class="image-wrap" :class="imageClass" v-if="mode === 'recommend'">
    <NuxtLink class="image-item" v-for="item in imageItems" :aria-label="(item as PostDetail).title"
      :key="((item as PostDetail).id)" :to="articleLink(item as PostDetail)">
      <img src="~/assets/icons/color-placeholder.svg" :data-src="imageQuality((item as PostDetail).covers[0])"
        :alt="(item as PostDetail).title" class="lazyload" loading="lazy" />
    </NuxtLink>
  </object>

  <!-- 其他 -->
  <div class="image-wrap" :class="imageClass" v-else>
    <div class="image-item" v-for="item in imageItems" :key="(item as string)">
      <img src="~/assets/icons/color-placeholder.svg" :data-src="imageQuality(item as string)" :alt="alt" class="lazyload"
        loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
.image-wrap {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  /* grid-template-rows: repeat(1, minmax(0px, 300px)); */
  grid-gap: 2px;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border-color-0);
}

.image-wrap.one {
  grid-template-columns: unset;
  border: unset;
}

.image-wrap.one>.image-item {
  width: 100%;
  height: auto;
  max-width: fit-content;
  max-height: 300px;
  border-radius: var(--radius);
  border: 1px solid rgb(207, 217, 222);
  overflow: hidden;
  padding-top: unset;
}

.image-wrap.one>.image-item>img {
  position: relative;
  top: unset;
  left: unset;
  width: 100%;
  height: 100%;
}

.image-wrap.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.image-wrap.four>.image-item:first-child {
  grid-column-start: 1;
  grid-column-end: 4;
  padding-top: 60%;
}

.image-wrap.five>.image-item:first-child {
  grid-column-start: 1;
  grid-column-end: 3;
  padding-top: calc(50% - 1px);
}

.image-item {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 100%;
}

.image-item>img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>