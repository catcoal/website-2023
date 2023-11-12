<script setup lang="ts">
import { ParseTime } from "~/utils/date";
import { PostDetail } from "~/api/post"
const props = defineProps<{
  data: PostDetail
}>();
const authorName = computed(() =>
  props.data.author ? "@" + props.data.author?.author : ""
);
</script>

<template>
  <div class="header-wrap">
    <div class="avatar-wrap Stereobox">
      <img src="~/assets/images/avatar.jpeg" alt="" srcset="" />
    </div>
    <div class="user-info-wrap">
      <div class="nickname">
        <p>{{ authorName }}</p>
        <span>·</span>
        <span>{{ ParseTime(data.createdAt, "{m}月{d}日") }}</span>
      </div>
      <h2>{{ data.title }}</h2>
    </div>
  </div>
</template>

<style scoped>
.header-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar-wrap {
  width: 43px;
  min-width: 43px;
  height: 43px;
  border-radius: 50%;
  overflow: hidden;
  --Stereo-radius: 50%;
}

.avatar-wrap>img {
  display: block;
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

.nickname {
  font-size: 14px;
  font-weight: 400;
  /* line-height: 20px; */
  display: flex;
  gap: 0 5px;
  flex-wrap: wrap;
  align-items: baseline;
  opacity: 0.5;
}

.user-info-wrap>h2 {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
</style>