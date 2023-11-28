<script setup lang="ts">
const props = defineProps({
    error: Object
})

let statusCode = props.error?.statusCode || 500;

const backHome = () => {
    clearError({ redirect: '/' });
}
</script>

<template>
    <div class="error-container">
        <h1>{{ statusCode }}</h1>
        <p>{{ props.error?.statusMessage }}</p>
        <div v-html="props.error?.message" class="content"></div>
        <button class="Stereobox" @click="backHome">返回</button>
    </div>
</template>

<style scoped>
.error-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    min-height: 100vh;
    padding: 100px 0;
}

p {
    opacity: 0.8;
}

.content {
    word-wrap: break-word;
    white-space: break-spaces;
    background-color: #000;
    color: #FFF;
    font-size: 14px;
    padding: 20px;
    border-radius: 10px;
    overflow: hidden;
    box-sizing: border-box;
    max-height: 50vh;
    overflow: scroll;
}

span {
    opacity: 0.5;
}

button {
    cursor: pointer;
    width: 100%;
    max-width: 100px;
    padding: 5px 0;
    border-radius: 10px;
    --Stereo-radius: 10px;
}
</style>