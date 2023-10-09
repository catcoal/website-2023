<script setup lang="ts">
import { ParseTime } from "~/utils/date";
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const authorName = computed(() =>
  props.data.author ? "@" + props.data.author?.author : ""
);
</script>

<template>
  <div class="header-wrap">
    <div class="avatar-wrap">
      <img src="~/assets/images/avatar.jpeg" alt="" srcset="" />
    </div>
    <div class="user-info-wrap">
      <div class="nickname">
        <p>{{ authorName }}</p>
        <span>{{ ParseTime(data.createdAt, "{y}-{m}-{d} {h}:{i}") }}</span>
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

.nickname {
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  display: flex;
  gap: 0 10px;
  flex-wrap: wrap;
}

.nickname > p {
  font-weight: 400;
}

.nickname > span {
  opacity: 0.8;
}

.user-info-wrap > h2 {
  font-size: 18px;
  line-height: 20px;
  font-weight: 500;
}
</style>