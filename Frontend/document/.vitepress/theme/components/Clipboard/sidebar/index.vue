<template>
    <div class="sidebar-box">
        <div class="Margins">
            <QRcode></QRcode>
            <el-link href="/docs/report/ContentReport" type="danger" size="large" style="color:#f56c6c;">
                <el-icon>
                    <WarnTriangleFilled />
                </el-icon>非法内容举报（请不要上传敏感信息！）
            </el-link>
        </div>
        <!-- <div class="info-box Margins">
            <Preview></Preview>
            <div style="margin: 30px 0;">
                <information></information>
            </div>
           
        </div> -->
    </div>
</template>
<script setup>

</script>
<style scoped>
.sidebar-box {
    width: 100%;
    min-width: 300px;
    height: auto;
    background-color: var(--vp-c-bg-custom);
    transition: all ease 0.2s;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.Margins {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
}

.info-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}


@media (max-width: 992px) {
    .sidebar-box {
        flex-wrap: wrap;
    }
}
</style>
