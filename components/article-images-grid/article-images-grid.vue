<script setup>
import { FetchPostRecommendList } from "~/api/post";
const props = defineProps(["images", "mode"]);
const imageUrls = ref(props.images || []);

if (props.mode === "recommend") {
  // 获取推荐数据
  let res = await FetchPostRecommendList();
  imageUrls.value = res.data.map((item) => {
    return {
      id: item.id,
      cover: item.covers[0],
    };
  });
}

const articleLink = (item) => {
  if (props.mode == 'recommend') {
    return "/article/" + item.id;
  }
};

const imageClass = computed(() => {
  switch (imageUrls.value?.length) {
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
</script>

<template>
  <object class="image-wrap" :class="imageClass">
    <NuxtLink class="image-item" v-for="item in imageUrls" :key="mode == 'recommend' ? item.id : item"
      :to="articleLink(item)">
      <img :src="mode == 'recommend' ? item.cover : item" alt="" />
    </NuxtLink>
  </object>
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