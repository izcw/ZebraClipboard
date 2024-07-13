<template>
    <div>
        <div class="box">
            <div class="left">
                <dir style="padding-bottom: 1rem;  display: flex;justify-content: space-between;align-items: center;">
                    <div>
                        <el-button plain @click="addTab(editableTabsValue)" size="large" style="background-color:var(--vp-c-bg-custom);color:var(--vp-c-text-1);border: 1px solid var(--vp-c-divider);">
                            <el-icon><DocumentAdd /></el-icon>&ensp;新建文本文档
                        </el-button>&emsp;
                        <el-text v-if="true" type="success" size="small">已于 02:57:33
                            保存成功</el-text>
                        <el-text v-else type="warning" size="small">网络中断 本地存储中</el-text>
                    </div>
                    <el-text class="mx-1 expire" style="color: var(--vp-c-text-1);" @click="centerDialogVisible = true"
                        size="small">
                        <span>3</span>天后过期</el-text>
                </dir>

                <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="tabremove()" class="demo-tabs"
                    @edit="handleTabsEdit">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
                        <Editor />
                    </el-tab-pane>
                </el-tabs>
            </div>


            <el-dialog v-model="centerDialogVisible" title="分享" align-center>
                <div class="right">
                    <div style="margin:0 2rem;">
                        <el-text class="mx-1" type="success">更新成功</el-text>
                        <!-- <operation></operation> -->
                        <QRcode></QRcode>
                    </div>
                    <div style="margin:0 2rem;">
                        <Preview></Preview>
                        <information></information>
                        <el-link href="/docs/report/ContentReport" type="danger" size="large" style="color:#f56c6c;">
                            <el-icon>
                                <WarnTriangleFilled />
                            </el-icon>非法内容举报（请不要上传敏感信息！）
                        </el-link>
                    </div>
                </div>
            </el-dialog>
        </div>
        <div style="display: flex;flex-wrap: wrap; justify-content: space-between;user-select:none;">
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

    </div>

</template>

<script setup>
import { ref, provide, markRaw } from 'vue'
import { ElMessageBox,ElMessage } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const centerDialogVisible = ref(false);
provide('centerDialogVisible', centerDialogVisible);

// 标签页
let tabIndex = 2
const editableTabsValue = ref('1')
const editableTabs = ref([
    {
        title: '文本文档 1',
        name: '1'
    },
    {
        title: '文本文档 2',
        name: '2'
    },
])
const addTab = (targetName) => {
    if (editableTabs.value.length >= 2) {
        ElMessage({
            message: '游客最多新建两个文档，登录后享更大空间！',
            type: 'warning',
        })
        return
    }
    const newTabName = `${++tabIndex}`
    editableTabs.value.push({
        title: '文本文档 ' + (Number(editableTabs.value.length) + 1),
        name: newTabName
    })
    editableTabsValue.value = newTabName
}
const tabremove = (el) => {
    console.log("删除" + el);
    ElMessageBox.confirm(
        '确定删除吗？',
        {
            type: 'warning',
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            icon: markRaw(Delete),
        }
    )
}

const handleTabsEdit = (
    targetName,
    action
) => {
    if (action === 'add') {
        const newTabName = `${++tabIndex}`
        editableTabs.value.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content',
        })
        editableTabsValue.value = newTabName
    } else if (action === 'remove') {
        const tabs = editableTabs.value
        let activeName = editableTabsValue.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        activeName = nextTab.name
                    }
                }
            })
        }

        editableTabsValue.value = activeName
        editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    }
}
</script>

<style scoped>
.commonblock {
    /*border-bottom: 1px dashed rgba(0, 0, 0, .1);*/
    padding-bottom: 30px;
    margin-bottom: 30px;
}

.box {
    display: flex;
    align-items: flex-start;
    margin: 10px 0 60px 0;
}

.left {
    width: 100%;

    position: relative;
}

/*.left .Successfullysaved {
    position: absolute;
    right: 0px;
    top: 5px;
}*/



.right {
    min-width: 300px;
    /*width: 240px;
    min-width: 240px;*/
    height: auto;
    margin-left: 15px;
    padding: 30px 15px;
    box-sizing: border-box;
    /*box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);*/
    background-color: var(--vp-c-bg-custom);
    opacity: 0.8;
    transition: all ease 0.2s;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.right:hover {
    opacity: 1;
}

@media (max-width: 992px) {
    .box {
        flex-direction: column;
    }

    .left {
        width: 100%;
    }

    .right {
        width: 100%;
        margin-left: 0;
        /* margin-top: 60px;
       box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);*/
        flex-direction: column !important;
    }

}

.editor {
    box-shadow: 0px 0px 6px 0 rgba(0, 0, 0, .1);
    margin-bottom: 60px;
}
</style>