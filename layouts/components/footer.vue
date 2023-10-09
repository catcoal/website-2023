<template>
    <div class="footer-wrap">
        <a href="http://beian.miit.gov.cn/" target="_blank" class="record-text">蜀ICP备2023003404号-1</a>
        <a href="https://www.upyun.com/?utm_source=lianmeng&utm_medium=referral" target="_blank" class="upyun-wrap">
            <span>本网站由</span>
            <img src="~/assets/icons/upyun_logo.svg" alt="">
            <span>提供CDN加速/云存储服务</span>
        </a>
    </div>
</template>

<script setup>
</script>

<style scoped>
.footer-wrap {
    display: flex;
    flex-direction: column;
    gap: 5px;
    /* padding: 0 var(--theme-gap); */
}

.record-text {
    font-size: 12px;
    color: #101419;
    opacity: 0.5;
}

.upyun-wrap {
    display: flex;
    align-items: center;
    font-size: 12px;
    gap: 5px;
}

.upyun-wrap>span {
    opacity: 0.5;
}

.upyun-wrap>img {
    width: 50px;
    height: 16px;
}
</style>