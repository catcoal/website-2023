<script setup lang="ts">
import Gravatar from "~/components/Gravatar/Gravatar.vue";
import { SendComment, IComment, Comment } from "~/api/comment";
import { PostDetailKey } from "~/api/post";

const emit = defineEmits({
    success: (comment: Comment) => {
        return comment
    }
});
const PostDetail = inject(PostDetailKey);
const currentFocusName = ref<string>();
const CommentForm = reactive<IComment>({
    author: '',
    email: '',
    authorUrl: '',
    postId: PostDetail?.value?.id!,
    parentId: undefined,
    content: ''
});
const replying = ref(false);
const replyTip = ref('');

const autoResizeTextarea = (event: Event): void => {
    let target = event.target as HTMLElement;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
}

const reply = async () => {
    if (replying.value) return;
    let { author, authorUrl, email, content } = CommentForm;
    if (!author || !authorUrl || !email) {
        replyTip.value = `请填写${!author ? ' 昵称' : ''}${!email ? ' 邮箱' : ''}${!authorUrl ? ' 网址' : ''}`
        return;
    };
    if (!content) {
        replyTip.value = `需要说一些什么呢？`
        return
    };
    replyTip.value = '';
    replying.value = true;
    try {
        let comment = (await SendComment(CommentForm))?.data;
        CommentForm.content = '';
        emit('success', comment!);
    } catch (err: any) {
        replyTip.value = err;
    } finally {
        replying.value = false;
    }
}
</script>

<template>
    <div class="comment-reply-wrap Stereobox">
        <div class="header">
            <div v-show="CommentForm.email" class="avatar-wrap Stereobox">
                <Gravatar :email="CommentForm.email"></Gravatar>
            </div>
            <div class="input-warp" :class="{ 'active': currentFocusName === 'author' || CommentForm?.author }">
                <div class="input-label">
                    <p>昵称</p>
                    <FontAwesomeIcon icon="fa-cat" size="lg" />
                </div>
                <input v-model="CommentForm.author" type="text" @focus="currentFocusName = 'author'"
                    @blur="currentFocusName = ''">
            </div>

            <div class="input-warp" :class="{ 'active': currentFocusName === 'email' || CommentForm?.email }">
                <div class="input-label">
                    <p>邮箱</p>
                    <FontAwesomeIcon icon="fa-envelope" size="lg" />
                </div>
                <input v-model="CommentForm.email" type="text" @focus="currentFocusName = 'email'"
                    @blur="currentFocusName = ''">
            </div>

            <div class="input-warp" :class="{ 'active': currentFocusName === 'authorUrl' || CommentForm?.authorUrl }">
                <div class="input-label">
                    <p>网址</p>
                    <FontAwesomeIcon icon="fa-link" size="lg" />
                </div>
                <input v-model="CommentForm.authorUrl" type="text" @focus="currentFocusName = 'authorUrl'"
                    @blur="currentFocusName = ''">
            </div>
        </div>
        <div class="body">
            <textarea v-model="CommentForm.content" rows="2" placeholder="说点什么吧～"
                @input="autoResizeTextarea($event)"></textarea>
        </div>
        <div class="footer">
            <div class="tip-wrap" :class="{ 'show': replyTip }">
                <p>{{ replyTip }}</p>
            </div>
            <div @click.stop="reply" class="reply" :class="{ 'replying': replying, 'replyed': !replying }">
                <FontAwesomeIcon icon="fa-paper-plane" size="lg" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.comment-reply-wrap {
    position: relative;
    background-color: #FFF;
    padding: var(--gap);
    border-radius: var(--radius);
    /* overflow: hidden; */
}

.comment-reply-wrap::after {
    position: absolute;
    z-index: -1;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(125deg, var(--theme-color) -70%, transparent 30%);
    opacity: 0.6;
    border-radius: inherit;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}

.avatar-wrap {
    position: absolute;
    z-index: 2;
    top: -10px;
    left: -10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
}

.avatar-wrap>img {
    width: 100%;
    height: 100%;
}

.input-warp {
    position: relative;
    display: flex;
    gap: 0;
    border-bottom: 1px dashed #253445;
    padding: 4px 0;
    font-size: 14px;
}

.input-warp::after {
    position: absolute;
    content: '';
    bottom: -1px;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--theme-color);
    opacity: 0;
    transition: .3s ease;
    transition-property: opacity transform;
    transform: translateY(1px);
}

.input-warp.active::after {
    opacity: 1;
    transform: translateY(0px);
}

.input-warp.active>.input-label>p {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
}

.input-warp.active>.input-label>svg {
    opacity: 1;
    transform: translate3d(0, 0px, 0);
}

.input-label {
    position: relative;
    white-space: nowrap;
}

.input-label>p {
    transform: translate3d(0, 0px, 0);
    transition: .3s ease;
    transition-property: transform, opacity;
}

.input-label>svg {
    position: absolute;
    bottom: 1px;
    left: 4px;
    color: var(--theme-color);
    opacity: 0;
    transform: translate3d(0, 10px, 0);
    transition: .3s ease;
    transition-property: transform, opacity;
}

.input-warp>input {
    width: 100%;
    padding: 0 5px 0 3px;
    background-color: transparent;
}

textarea {
    resize: none;
    width: 100%;
    padding: 10px 0;
    background-color: transparent;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tip-wrap {
    font-size: 12px;
    font-weight: bold;
    background-color: tomato;
    color: #FFF;
    padding: 1px 5px;
    border-radius: 5px;
    opacity: 0;
    transform: translateX(-5px);
    transition: .3s ease;
    transition-property: opacity, transform;
}

.tip-wrap.show {
    opacity: 1;
    transform: translateX(0px);
}

.reply {
    position: relative;
    cursor: pointer;
    background-color: var(--theme-color);
    color: #FFF;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 12px;
    transition: .3s ease;
    transition-property: transform, opacity;
}

.reply:active {
    opacity: 0.8;
    transform: scale(0.98);
}

.reply.replying {
    opacity: 0.8;
}

.reply.replyed>svg {
    animation: replyed 1.3s cubic-bezier(0.32, 0.68, 0.33, 1.28) forwards;
}

@keyframes replyed {

    0%,
    100% {
        opacity: 1;
        transform: translate(0px, 0px);
    }

    10% {
        opacity: 0;
        transform: translate(20px, -20px);
    }

    20% {
        opacity: 0;
        transform: translate(-20px, 20px);
    }
}

.reply.replying>svg {
    animation: fly 3s linear infinite;
}

/* .reply::after {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.5;
    background-image: linear-gradient(red, green);
    transition: .3s ease;
    transition-property: background-position;
} */

/* .reply:hover::after {
    background-position: 200px;
} */

.reply>svg {
    position: relative;
    z-index: 2;
}

@keyframes fly {
    0% {
        transform: translate3d(0, 0, 0);
    }

    25% {
        transform: translate3d(3px, -3px, 0);
    }

    50% {
        transform: translate3d(-3px, 2px, 0);
    }

    75% {
        transform: translate3d(-1px, -1px, 0);
    }

    100% {
        transform: translate3d(0, 0, 0);
    }
}
</style>