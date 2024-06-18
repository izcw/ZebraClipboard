<template>
    <ul class="annex">
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>

        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-image src="https://picserver.duoyu.link/picfile/image/202403/31-1711877887154.jpg" fit="cover" />
        </li>
        <li>
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
                <el-icon>
                    <Plus />
                </el-icon>

                <template #file="{ file }">
                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                            <el-icon><zoom-in /></el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                            <el-icon>
                                <Download />
                            </el-icon>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                            <el-icon>
                                <Delete />
                            </el-icon>
                        </span>
                    </span>
                </template>
            </el-upload>

        </li>
    </ul>
</template>
<script setup>

</script>
<style scoped>
.annex {
    padding: 10px !important;
    display: flex;
    flex-wrap: wrap;
}

.annex li {
    width: 70px;
    height: 70px;
    list-style: none;
    margin: 0 10px 10px 0 !important;
    border-radius: 8px;
    overflow: hidden;
}

.annex li .el-image {
    width: 100% !important;
    height: 100% !important;
}
</style>
