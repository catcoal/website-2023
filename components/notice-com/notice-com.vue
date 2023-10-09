<script setup>
import {GetNotice} from '~/api/common';
const notice = ref("");

let data = await GetNotice();
notice.value = data.data.value;
</script>

<template>
<div class="notice-wrap">
    <div class="header-wrap">
        <div class="tag-wrap">
            <span>消息</span>
        </div>
    </div>
    <div class="body-wrap">
        {{notice}}
    </div>
</div>
</template>

<style scoped>
.notice-wrap{
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid var(--border-color-1);
    border-radius: var(--radius);
    padding: var(--gap);
}

.header-wrap{
    align-self: flex-start;
    display: block;
}

.tag-wrap{
    border-radius: var(--radius);
    background-color: var(--fg-color-0);
    color: var(--bg-color-0);
    padding: 5px 15px;
    font-size: 14px;
    letter-spacing: 1px;
}

.body-wrap{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    white-space: break-spaces;
}
</style>