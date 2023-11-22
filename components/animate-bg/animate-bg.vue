<template>
    <div class="animate-wrap">
        <canvas ref="canvasRef" :width="c_width" :height="c_height"></canvas>
    </div>
    <!-- <button @click="toggleAnimation">Toggle Animation</button> -->
</template>
  
<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import a from "~/assets/canvas-animate/blob-haikei (1).svg"
import b from "~/assets/canvas-animate/blob-haikei.svg"
import c from "~/assets/canvas-animate/blob-scatter-haikei (1).svg"
import d from "~/assets/canvas-animate/blob-scatter-haikei (2).svg"
import e from "~/assets/canvas-animate/blob-scatter-haikei.svg"

const timer = ref();
const router = useRouter();

// router.beforeEach(() => {
//     startAnimation();
// })

// useNuxtApp().hook('page:transition:finish', () => {
//     if (animationActive.value) {
//         clearTimeout(timer.value);
//         timer.value = setTimeout(() => {
//             stopAnimation();
//         }, 2000)
//     }
// })

// Props
const props = defineProps({
    imageSources: {
        type: Array as () => string[],
        default: () => [a, b, c, d, e],
    },
    minSpeed: {
        type: Number,
        default: 0.02,
    },
    maxSpeed: {
        type: Number,
        default: 0.04,
    },
    minSize: {
        type: Number,
        default: 50,
    },
    maxSize: {
        type: Number,
        default: 300,
    }
});

const c_width = ref(0);
const c_height = ref(0);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let animationActive = reactive({ value: false });
let speedFactor = reactive({ value: 0 });

interface ImageData {
    img: HTMLImageElement;
    x: number;
    y: number;
    rotation: number;
    size: number;
    speed: number;
    initialRotation: number;
}

function isOverlapping(img1: ImageData, img2: ImageData): boolean {
    const img1Width = img1.size;
    const img1Height = img1.img.height * (img1.size / img1.img.width);
    const img2Width = img2.size;
    const img2Height = img2.img.height * (img2.size / img2.img.width);

    return !(
        img1.x + img1Width < img2.x ||
        img1.x > img2.x + img2Width ||
        img1.y + img1Height < img2.y ||
        img1.y > img2.y + img2Height
    );
}

// 绘制图片
function drawImages(ctx: CanvasRenderingContext2D, imagesData: ImageData[]) {
    ctx.clearRect(0, 0, c_width.value, c_height.value);
    imagesData.forEach(data => {
        ctx.save();
        const width = data.size;
        const height = data.img.height * (data.size / data.img.width);
        ctx.translate(data.x + width / 2, data.y + height / 2);
        ctx.rotate(data.rotation + data.initialRotation);
        ctx.drawImage(data.img, -width / 2, -height / 2, width, height);
        ctx.restore();
        if (animationActive.value) {
            data.rotation += data.speed * speedFactor.value;
        }
    });
    animationFrameId = requestAnimationFrame(() => drawImages(ctx, imagesData));
}

onMounted(() => {
    const canvas = canvasRef.value;
    c_width.value = window.innerWidth;
    c_height.value = window.innerHeight;
    if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = c_width.value * dpr;
        canvas.height = c_height.value * dpr;
        canvas.style.width = `${c_width.value}px`;
        canvas.style.height = `${c_height.value}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            Promise.all(props.imageSources.map(src => loadImage(src))).then(loadedImages => {
                const imagesData: ImageData[] = [];
                placeImage(ctx, imagesData, loadedImages);
            });
        }
    }
});

// 加载图片
function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

// 布置图片
function placeImage(ctx: CanvasRenderingContext2D, imagesData: ImageData[], images: HTMLImageElement[]) {
    const maxAttempts = 10000;
    let attempts = 0;

    while (attempts < maxAttempts && ctx.canvas.width * ctx.canvas.height > totalArea(imagesData)) {
        images.forEach(img => {
            const size = props.minSize + Math.random() * (props.maxSize - props.minSize);
            const width = size;
            const height = img.height * (size / img.width);
            let x = Math.random() * (c_width.value - width);
            let y = Math.random() * (c_height.value - height);
            const initialRotation = Math.random() * 2 * Math.PI;
            const newImageData: ImageData = { img, x, y, rotation: 0, size, speed: 0, initialRotation };

            if (!imagesData.some(data => isOverlapping(data, newImageData))) {
                newImageData.speed = props.minSpeed + Math.random() * (props.maxSpeed - props.minSpeed);
                imagesData.push(newImageData);
            }
        });

        attempts++;
    }

    drawImages(ctx, imagesData);
}

function totalArea(imagesData: ImageData[]): number {
    return imagesData.reduce((total, data) => total + (data.size * data.img.height * (data.size / data.img.width)), 0);
}

// 开始动画
function startAnimation() {
    if (!animationActive.value) {
        animationActive.value = true;
        let accelerate = () => {
            if (speedFactor.value < 1) {
                speedFactor.value += 0.01; // 加速
                requestAnimationFrame(accelerate);
            }
        };
        accelerate();
    }
}

// 停止动画
function stopAnimation() {
    let decelerate = () => {
        if (speedFactor.value > 0) {
            speedFactor.value -= 0.01; // 减速
            requestAnimationFrame(decelerate);
        } else {
            speedFactor.value = 0; // 确保速度为零
            animationActive.value = false; // 完全停止动画
        }
    };
    decelerate();
}
</script>
  
<style>
.animate-wrap {
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.1;
}

canvas {
    width: 100%;
    height: 100%;
}
</style>
  