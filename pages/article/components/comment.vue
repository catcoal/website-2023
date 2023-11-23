<script setup lang="ts">
import CommentItem from './comment-item.vue';
import CommentRelay from './comment-reply.vue';
</script>

<template>
    <div class="comment-reply">
        <CommentRelay></CommentRelay>
    </div>
    <div class="comment-list">
        <CommentItem></CommentItem>
        <CommentItem></CommentItem>
    </div>
</template>

<style scoped>
.comment-reply {
    margin-bottom: var(--gap);
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
}
</style>