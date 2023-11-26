<script setup lang="ts">
import CommentItem from './comment-item.vue';
import CommentRelay from './comment-reply.vue';
import { FetchComments, Comment } from "~/api/comment";
import { PostDetailKey } from "~/api/post";

const PostDetail = inject(PostDetailKey);
const comments = ref<Comment[]>();
comments.value = (await FetchComments({ postId: PostDetail?.value?.id! })).data;

const replySuccess = (comment: Comment) => {
    comments.value?.unshift(comment);
}
</script>

<template>
    <div class="comment-reply">
        <CommentRelay @success="replySuccess"></CommentRelay>
    </div>
    <TransitionGroup class="comment-list" name="list" tag="div">
        <CommentItem :key="comment.id" :comment="comment" v-for="comment in comments"></CommentItem>
    </TransitionGroup>
</template>

<style>
.comment-list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) / 2);
}
</style>

<style scoped>
.comment-reply {
    margin-bottom: var(--gap);
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.list-leave-to {
    opacity: 1;
    transform: scale(1);
}

.list-leave-active {
    position: absolute;
}
</style>