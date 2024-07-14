<template>
    <div class="Preview-box">
        <p style="color:var(--vp-c-brand-1);">预览</p>
        <div class="content MoreMasks">
            <pre>{{ viewtxt }}</pre>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
let viewtxt = ref(`.Preview-box{
    margin: 2rem 0;
    color: var(--vp-c-text-1);
}
.Preview-box .content{
    overflow: hidden;
    width: 100%;
    border: 1px solid var(--vp-c-divider);
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    padding: 0.5rem 1rem;
    max-height: 300px;
}.Preview-box{
    margin: 2rem 0;
    color: var(--vp-c-text-1);
}
.Preview-box .content{
    overflow: hidden;
    width: 100%;
    border: 1px solid var(--vp-c-divider);
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    padding: 0.5rem 1rem;
    max-height: 300px;
}`)
</script>
<style scoped>
.Preview-box {
    color: var(--vp-c-text-1);
}

.Preview-box .content {
    background-color: var(--bg-preview);
    overflow: hidden;
    width: 100%;
    max-height: 160px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    padding: 0.5rem 1rem;
}

.MoreMasks {
    position: relative;
    overflow: hidden;
    /* 确保遮罩效果只在元素内部显示 */
}

.MoreMasks::after {
    margin: 2px;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    /* 遮罩的高度，可以根据需要调整 */
    background: linear-gradient(to top, var(--vp-c-bg-custom), transparent);
    /* 从白色到透明的渐变 */
    pointer-events: none;
    /* 防止遮罩影响点击事件 */
}
</style>
