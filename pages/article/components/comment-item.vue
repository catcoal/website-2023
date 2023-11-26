<script setup lang="ts">
import Gravatar from "~/components/Gravatar/Gravatar.vue";
import { Comment } from "~/api/comment";
import { ParseTime } from "~/utils/date";
defineProps<{
    comment: Comment
}>();
</script>

<template>
    <div class="comment-item">
        <div v-if="comment.status === 'Unreviewed'" class="status">审核后展示</div>
        <div class="avatar-wrap">
            <Gravatar :email-hash="comment.author.emailHash"></Gravatar>
        </div>
        <div class="comment-body">
            <div class="comment-body-header">
                <h2>{{ comment.author.author }}</h2>
                <span> {{ ParseTime(comment.createdAt, '{y}-{m}-{d} {h}:{i}') }}</span>
            </div>
            <p>{{ comment.content }}</p>
        </div>
    </div>
</template>

<style scoped>
.comment-item {
    position: relative;
    display: flex;
    gap: 10px;
    background-color: var(--bg-color-0);
    padding: var(--gap);
    border-radius: var(--radius);
}

.status {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #FFF;
    background-color: tomato;
    padding: 1px 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.avatar-wrap {
    width: 35px;
    min-width: 35px;
    height: 35px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-wrap>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.comment-body-header {
    display: flex;
    align-items: center;
    gap: 7px;
}


.comment-body-header>h2 {
    font-size: 14px;
    font-weight: 500;
}

.comment-body-header>span {
    font-size: 12px;
    opacity: 0.6;
}

.comment-body p {
    font-size: 14px;
}
</style>