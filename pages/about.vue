<template>
    <div class="container">
        {{message}}
        {{res}}
        <h1 v-for="item in res" :key="item.id">{{ item.title }}</h1>
    </div>
</template>

<script setup>
const res = await useLazyAsyncData('article', () => $fetch('https://api.nuxtjs.dev/mountains'))

useHead({
  title:"关于"
})

const asyncData = async () => {
  return { message: '--------------' };
};
</script>

<style scoped></style>