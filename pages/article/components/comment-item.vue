<script setup lang="ts">
import Gravatar from "~/components/Gravatar/Gravatar.vue";
import CommentReply from "./comment-reply.vue";
import CommentItem from "./comment-item.vue"
import { Comment } from "~/api/comment";
import { ParseTime } from "~/utils/date";

const props = defineProps<{
    rootComment?: Comment
    comment: Comment
}>();

const showReply = ref<boolean>(false);

const reply = () => {
    showReply.value = !showReply.value;
}

const replySuccess = (comment: Comment) => {
    if (props.rootComment) {
        props.rootComment?.childComments.unshift(comment);
    } else {
        props.comment?.childComments.unshift(comment);
    }
}
</script>

<template>
    <div class="comment-item">
        <div class="comment-warp">
            <div class="comment-inner">
                <div v-if="comment.status === 'Unreviewed'" class="status">审核后展示</div>
                <span v-if="!comment.childComments || comment.childComments?.length" class="child-line"></span>
                <div class="avatar-wrap">
                    <Gravatar :email-hash="comment.author.emailHash"></Gravatar>
                </div>
                <div class="comment-control" v-if="comment.status === 'Show'">
                    <div @click="reply" class="comment-control-item" :class="{ 'active': showReply }">
                        <FontAwesomeIcon icon="fa-regular fa-message"></FontAwesomeIcon>
                    </div>
                </div>
                <div class="comment-body">
                    <div class="comment-body-header">
                        <div class="user-info">
                            <h2>{{ comment.author.author }}</h2>
                            <span> {{ ParseTime(comment.createdAt, '{y}-{m}-{d} {h}:{i}') }}</span>
                        </div>
                    </div>
                    <div class="parent-comment" :title="comment?.parent?.content" v-if="comment.parent">
                        <span>{{ '@' + comment.parent.author.author + ':' }}</span>
                        <span>{{ comment?.parent?.content }}</span>
                    </div>
                    <p>{{ comment.content }}</p>
                </div>
            </div>
            <div class="reply-wrap" v-show="showReply">
                <CommentReply @success="replySuccess" :root-comment-id="comment.id" :reply-comment="comment"></CommentReply>
            </div>
        </div>
        <div class="child-comments" v-if="comment.childComments">
            <CommentItem v-for="item in comment.childComments" :root-comment="comment" :comment="item"></CommentItem>
        </div>
    </div>
</template>

<style scoped>
.comment-item {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--bg-color-0);
    border-radius: var(--radius);
}

.comment-warp {
    position: relative;
    padding: var(--gap);
    padding-bottom: 0;
}

.comment-inner {
    display: flex;
    gap: 10px;
}

.child-comments {
    padding-bottom: var(--gap);
}

.child-comments .comment-item:last-child .child-line {
    display: none;
}

.child-line {
    position: absolute;
    z-index: 2;
    width: 2px;
    border-radius: 2px;
    left: calc(var(--gap) + 15px);
    bottom: calc(var(--gap) * -1);
    height: calc(100% - 35px);
    background-color: var(--theme-color);
    opacity: 0.5;
}

.reply-wrap {
    margin-top: var(--gap);
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
    background-color: #FFF;
    padding: 2px;
}

.avatar-wrap>img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.comment-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
}

.parent-comment {
    font-size: 12px;
    background-color: #eee;
    padding: 1px 7px;
    border-radius: var(--radius);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    opacity: 0.5;
}

.comment-body-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.user-info {
    display: flex;
    align-items: center;
    user-select: none;
    gap: 7px;
}


.user-info>h2 {
    font-size: 14px;
    font-weight: 500;
}

.user-info>span {
    font-size: 12px;
    opacity: 0.6;
}

.comment-body p {
    font-size: 14px;
}

.comment-control {
    display: flex;
    gap: 5px;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    /* padding: calc(var(--gap) / 2 + 1px); */
}

.comment-control-item {
    font-size: 15px;
    cursor: pointer;
    transition: .3s ease;
    transition-property: color;
    padding: var(--gap);
}

.comment-control-item:hover,
.comment-control-item.active {
    color: var(--theme-color);
}
</style>