<script setup lang="ts">

</script>

<template>
  <div class="loading-wrap">
    <p>加载中</p>
  </div>
</template>

<style scoped>
.loading-wrap{
    position: absolute;
    z-index: 998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color-1);
    animation: show 0.3s ease forwards;
}

@keyframes show{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>