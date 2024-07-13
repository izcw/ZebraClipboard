<template>
    <div class="Preview-box">
        <p style="color:var(--vp-c-brand-1);">预览</p>
        <div class="content">
            <pre>{{viewtxt}}</pre>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue"
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
.Preview-box{
    margin: 2rem 0;
    color: var(--vp-c-text-1);
}
.Preview-box .content{
    overflow: hidden;
    width: 100%;
    max-height: 180px;
    border: 1px solid var(--vp-c-divider);
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    padding: 0.5rem 1rem;
}
</style>
