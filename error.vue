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
        <p>{{ props.error?.message }}</p>
        <span>{{ props.error?.message.stack }}</span>
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
}

p {
    opacity: 0.8;
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