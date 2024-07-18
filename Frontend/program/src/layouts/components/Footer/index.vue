<template>
    <div class="footer-box">
        <p>©2024 张成威</p>
        <p>学号 2331020120242</p>
        <p>v1.0.1</p>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=45098102000466" target="_blank">桂公网安备
            45098102000466号</a>
        <a href="https://beian.miit.gov.cn/" target="_blank">桂ICP备2022009640号-2</a>
    </div>
</template>
<script setup>

</script>
<style scoped lang='scss'>
.footer-box {
    padding-top: 60px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    p,
    a {
        font-size: 12px;
        color: var(--color-numeral-666);
        padding: 2px 6px;
    }
}
</style>
