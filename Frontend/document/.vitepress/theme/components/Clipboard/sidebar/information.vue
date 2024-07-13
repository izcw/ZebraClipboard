<template>
    <div class="commonblock">
        <p>创建时间：<span>2024年6月18日 00点29分</span></p>
        <p>更新时间：<span>2024年6月18日 00点29分</span></p>
        <p>上次查看：<span>2024年6月18日 00点29分</span></p>
        <p><el-countdown @click="reset" title="过期删除时间" format="HH:mm:ss" :value="value1" /></p>
        <p>查看次数：<span>1</span></p>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'
const value1 = ref(Date.now() + 1000 * 60 * 60 * 24 * 2)

// 重置
function reset() {
    value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2
}
</script>

<style scoped>
.commonblock{
    min-width: 280px;
}
p {
    font-size: 14px;
    line-height: 26px;
    color:var(--vp-c-brand-1);
    margin: 10px 0 1.2rem 0;
}

p span {
    color: var(--vp-c-text-1);
}


</style>