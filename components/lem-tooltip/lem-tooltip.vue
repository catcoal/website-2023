<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>

<template>
    <div class="tool-tip-wrap">
        <slot></slot>
        <span>{{ title }}</span>
    </div>
</template>

<style scoped>
.tool-tip-wrap {
    position: relative;
}

.tool-tip-wrap>span {
    position: absolute;
    top: 0;
    background-color: var(--theme-color);
    color: #FFF;
    padding: 5px 10px;
    border-radius: 5px;
}
</style>