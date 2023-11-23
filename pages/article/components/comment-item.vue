<script setup lang="ts">

</script>

<template>
    <div class="comment-item">
        <div class="avatar-wrap">
            <img src="~/assets/images/avatar.jpeg" alt="" srcset="">
        </div>
        <div class="comment-body">
            <div class="comment-body-header">
                <h2>123</h2>
                <span>2021-03-12</span>
            </div>
            <p>123123123121231231231212312312312123123123121231231231212312312312</p>
        </div>
    </div>
</template>

<style scoped>
.comment-item {
    display: flex;
    gap: 10px;
    background-color: var(--bg-color-0);
    padding: var(--gap);
    border-radius: var(--radius);
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
    font-size: 16px;
}

.comment-body-header>span {
    font-size: 12px;
    opacity: 0.6;
}

.comment-body p {
    font-size: 14px;
}
</style>