<script setup>
const props = defineProps({
  richText: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    id="post-content"
    class="post-content markdown-body"
    v-html="richText"
  ></div>
</template>

<style>
@import url("~/assets/style/github-md.css");

#post-content * {
  margin: revert;
  padding: revert;
  list-style: revert;
  color: revert;
  font-size: revert;
  word-break: break-word;
}

#post-content img {
  max-width: 100%;
  height: auto;
  /* width: 100%; */
  border-radius: var(--radius);
  border: 1px solid rgb(207, 217, 222);
}
</style>