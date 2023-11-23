<script setup lang="ts">

</script>

<template>
    <div class="comment-reply-wrap Stereobox">
        <div class="header">
            <div class="input-warp">
                <p>昵称</p>
                <input type="text">
            </div>
            <div class="input-warp">
                <p>邮箱</p>
                <input type="text">
            </div>
            <div class="input-warp">
                <p>网站</p>
                <input type="text">
            </div>
        </div>
        <div class="body">
            <textarea rows="2" placeholder="说点什么吧～"></textarea>
        </div>
    </div>
</template>

<style scoped>
.comment-reply-wrap {
    background-color: #FFF;
    padding: var(--gap);
    border-radius: var(--radius);
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}

.input-warp {
    display: flex;
    gap: 0;
    border-bottom: 1px dashed rgba(83, 183, 129, 1);
    padding: 2px 0;
    font-size: 14px;
}

.input-warp>p {
    white-space: nowrap;
    opacity: 0.8;
}

.input-warp>input {
    width: 100%;
    padding: 0 10px;
    /* font-weight: 500; */
}

textarea {
    resize: none;
    width: 100%;
    padding: 10px 0;
}
</style>