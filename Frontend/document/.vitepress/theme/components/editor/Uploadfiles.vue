<template>
    <div class="attachment">
        <el-text class="mx-1" type="warning">&ensp;<el-icon>
                <Link />
            </el-icon>&ensp;附件（暂未实现）：</el-text>
        <ul class="annex">
            <li>
                <div class="operatingButton delete">
                    <el-icon>
                        <DeleteFilled />
                    </el-icon>
                </div>
                <div class="filename">
                    <p>panda.JPG</p>
                </div>
                <el-image :src="srcList[0]" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" lazy hide-on-click-modal
                    :preview-src-list="srcList" :initial-index="4" fit="cover" />
            </li>
            <li>
                <div class="operatingButton delete">
                    <el-icon>
                        <DeleteFilled />
                    </el-icon>
                </div>
                <div class="filename">
                    <p>2331020120242张成威-斑马在线剪贴板</p>
                </div>
                <el-image src="/images/icon/file.png" fit="contain" />
            </li>
            <li>
                <div class="operatingButton delete">
                    <el-icon>
                        <DeleteFilled />
                    </el-icon>
                </div>
                <div class="filename">
                    <p>vue3.vue</p>
                </div>
                <el-image src="/images/icon/code.png" fit="contain" />
            </li>
            <li><!-- 上传 -->
                <el-upload action="#" list-type="picture-card" :auto-upload="false" disabled>
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
        <div style="display: flex;justify-content: flex-end;margin-right: 120px;padding-bottom: 10px;">
            <el-badge class="item" style="margin-top:10px;" type="warning" value="" :offset="[10, 5]">
                <el-text size="small" style="color: var(--vp-c-text-1);">字数：
                    <span>
                        {{letternumber}} / {{convertedData.NumberoFwords}}
                    </span>
                </el-text>
            </el-badge>
            &emsp;
            <el-badge class="item" style="margin-top:10px;" type="warning" value="登录后享更大空间" :offset="[10, 5]">
                <el-text size="small" style="color: var(--el-color-info);"><del>附件空间：
                    <span>
                        0 / {{convertedData.FileSize}}
                    </span></del>
                </el-text>
            </el-badge>
        </div>
    </div>

</template>
<script setup>
import { inject, computed, defineProps, ref, watch } from 'vue';

// 定义接收的 字数的变化
const props = defineProps({
    liminumber: {
    type: String, // 确保这里是 String
    required: true
  }
});

const letternumber = ref(props.liminumber);
// 监听 props.liminumber 的变化，并更新 letternumber
watch(() => props.liminumber, (newVal) => {
    letternumber.value = newVal;
}, { immediate: true }); // immediate: true 表示在监听器初始化时立即执行一次回调函数


// 注入
const limitationData = inject('limitationData');
const convertedData = computed(() => {
  if (limitationData && limitationData.value) {
    return {
      ...limitationData.value,
      FileSize: Math.floor(limitationData.value.FileSize / 1024) + ' MB' // FileSize 从字节转换为 MB
    };
  }
  return {};
});


let srcList = [
    '/images/icon/panda.jpg',
]
</script>
<style scoped>
.attachment {
    box-shadow: rgb(197, 197, 197) 0px 0px 2px inset;
    background-color: #f9f9f9ea;
    background-image: var(--tool-background);
}

.annex {
    padding: 10px !important;
    display: flex;
    flex-wrap: wrap;
}

.annex li {
    width: 90px;
    height: 80px;
    list-style: none;
    margin: 0 10px 10px 0 !important;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    padding-bottom: 28px;
}

.annex li .el-image {
    background-color: var(--el-fill-color-lighter);
    width: 100% !important;
    height: 100% !important;
}

/*操作按钮*/
.annex li:hover .operatingButton {
    opacity: 1;
}

.annex li .operatingButton {
    opacity: 0;
    transition: all ease 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    left: 0;
    width: 100% !important;
    height: 35% !important;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    z-index: 999;
}

.annex li .operatingButton:hover {
    background-color: rgba(0, 0, 0, 0.9);
}

.annex li .delete {
    bottom: 0;
}


.annex li .filename {
    height: auto !important;
    position: absolute;
    left: 0;
    bottom: 0px;
    z-index: 99;

}

.annex li .filename p {
    font-size: 12px;
    padding: 0 2px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 !important;
}
</style>
