<template>
    <div class="FooterInfo-box">
        <div>
            <el-text class="mx-1" type="info">斑马在线剪贴板是一个极简、开源、免费的在线剪贴板，浏览器数据使用AES-256加密。</el-text>
            <br>
            <el-text class="mx-1" type="info">技术支持：<el-link href="https://www.zhangchengwei.work"
                    style="color:#999">张成威</el-link> v1.0.0</el-text>
        </div>
        <br>
        <br>
        <el-link href="/docs/report/ContentReport" type="danger" size="large" style="color:#f56c6c;">
            <el-icon>
                <WarnTriangleFilled />
            </el-icon>非法内容举报（请不要上传敏感信息！）
        </el-link>
    </div>
</template>
<script setup>

</script>
<style scoped>
.FooterInfo-box {
    margin-top: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    user-select: none;
}
</style>
